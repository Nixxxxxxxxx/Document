import { DatePicker, Button, Space, Table, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import OrganizationService from "../../../api/services/organization-service";
import PodrazdService from "../../../api/services/podrazd-service";
import IndividualService from "../../../api/services/individuals-service";
import ProductService from "../../../api/services/products-service";
import WaybillheaderService from "../../../api/services/waybill-header-service";
import WaybillBodyService from "../../../api/services/waybill-body-service";
import { WaybillBodyDialog } from "../../../components/dialogs/waybill-body-dialog/WaybillBodyDialog";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

const { Option } = Select;

export const WayyBillView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ФИО",
      key: "lastname",
      render: (text, record) =>
        individuals.find((it) => it.id === record.individualid)?.lastName,
    },
    {
      title: "Товар",
      key: "title",
      render: (text, record) =>
        products.find((it) => it.id === record.productid)?.title,
    },
    {
      title: "ед изм",
      dataIndex: "unit",
    },
    {
      title: "количество",
      dataIndex: "count",
    },
    {
      title: "дата списания",
      dataIndex: "expdate",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div onClick={() => updateRecordHandler(record)}>
              <EditOutlined />
            </div>
            <div onClick={() => deleteRecordHandler(record.id)}>
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams();
  const [waybill, setWaybill] = useState(null);
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [products, setProducts] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [podrazds, setPodrazds] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const waybill = await WaybillheaderService.getOneRecord(id);
      const list = await WaybillBodyService.getAllHeadersRecords(id);
      const individuals = await IndividualService.getAllRecords();
      const products = await ProductService.getAllRecords();
      const organizations = await OrganizationService.getAllRecords();
      const podrazds = await PodrazdService.getAllRecords();
      setWaybill(waybill);
      setList(list);
      setIndividuals(individuals);
      setProducts(products);
      setOrganizations(organizations);
      setPodrazds(podrazds);

      return () => {
        setList([]);
        setWaybill(null);
        setIndividuals([]);
        setProducts([]);
        setOrganizations([]);
        setPodrazds([]);
      };
    }
    fetchData();
  }, []);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };
  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };
  const deleteRecordHandler = async (recordId) => {
    await WaybillBodyService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <div ref={componentRef}>
        <Space
          direction={"vertical"}
          align={"center"}
          style={{ width: "100%", marginBottom: 24 }}
        >
          <h2>
            vedomost <strong>{waybill?.number}</strong>
          </h2>

          <Space>
            Дата составления
            <DatePicker
              format="YYYY-MM-DD"
              value={moment(waybill?.dischargeDate) || null}
              onChange={(date) =>
                setWaybill(
                  { ...waybill, dischargeDate: date },
                  WaybillheaderService.updateRecord({
                    ...waybill,
                    dischargeDate: date,
                  })
                )
              }
              style={{ width: 232 }}
            />
          </Space>

          <Space>
            Структурное подразделение:{" "}
            <strong>
              <Select
                value={waybill?.podrazdid || null}
                onChange={(value) =>
                  setWaybill(
                    { ...waybill, podrazdid: value },
                    WaybillheaderService.updateRecord({
                      ...waybill,
                      podrazdid: value,
                    })
                  )
                }
                placeholder={"Выберите podrazd"}
                style={{ width: 425 }}
              >
                {podrazds.map((it) => (
                  <Option value={it.id}>{it.nameOrg}</Option>
                ))}
              </Select>
            </strong>
          </Space>

          <Space>
            Организация:{" "}
            <strong>
              <Select
                value={waybill?.organizationId || null}
                onChange={(value) =>
                  setWaybill(
                    { ...waybill, organizationId: value },
                    WaybillheaderService.updateRecord({
                      ...waybill,
                      organizationId: value,
                    })
                  )
                }
                placeholder={"Выберите organ"}
                style={{ width: 425 }}
              >
                {organizations.map((it) => (
                  <Option value={it.id}>
                    {it.lastName} {it.title}
                  </Option>
                ))}
              </Select>
            </strong>
          </Space>
        </Space>

        <Table dataSource={list} columns={columns} />
      </div>

      <Space>
        <Button onClick={createRecordHandler}>Создать</Button>
        <Button type="dashed" onClick={handlePrint}>
          Печать
        </Button>
      </Space>

      <WaybillBodyDialog
        visible={visible}
        onOk={(record) => {
          currentRecord
            ? setList(
                list.map((it) =>
                  it.id === currentRecord.id ? { ...record } : it
                )
              )
            : setList([...list, record]);

          setCurrentRecord(null);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        currentRecord={currentRecord}
        waybillheaderid={id}
        products={products}
        individuals={individuals}
      />
    </div>
  );
};
