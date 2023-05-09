import { DatePicker, Button, Space, Table, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import ProxyBodyService from "../../../api/services/proxy-body-service";
import ProxyHeaderService from "../../../api/services/proxy-head-service";
import OrganizationService from "../../../api/services/organization-service";
import IndividualService from "../../../api/services/individuals-service";
import ProductService from "../../../api/services/products-service";
import { ProxyBodyDialog } from "../../../components/dialogs/proxy-body-dialog/ProxyBodyDialog";
import { useReactToPrint } from "react-to-print";
import moment from "moment";

const { Option } = Select;

export const ProxyView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      key: "title",
      render: (text, record) =>
        products.find((it) => it.id === record.productid)?.title,
    },
    {
      title: "ед. изм.",
      dataIndex: "unit",
    },
    {
      title: "Количество",
      dataIndex: "cout",
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
  const [proxy, setProxy] = useState(null);
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const proxy = await ProxyHeaderService.getOneRecord(id);
      const list = await ProxyBodyService.getAllHeadersRecords(id);
      const individuals = await IndividualService.getAllRecords();
      const organizations = await OrganizationService.getAllRecords();
      const products = await ProductService.getAllRecords();

      setList(list);
      setProxy(proxy);

      setIndividuals(individuals);
      setOrganizations(organizations);
      setProducts(products);

      return () => {
        setList([]);
        setProxy(null);

        setIndividuals([]);
        setOrganizations([]);
        setProducts([]);
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
    await ProxyBodyService.removeRecord(recordId);
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
            Доверенность № <strong>{proxy?.number}</strong>
          </h2>

          <Space>
            Дата выписки
            <DatePicker
              format="YYYY-MM-DD"
              value={moment(proxy?.dischargeDate) || null}
              onChange={(date) =>
                setProxy(
                  { ...proxy, dischargeDate: date },
                  ProxyHeaderService.updateRecord({
                    ...proxy,
                    dischargeDate: date,
                  })
                )
              }
              style={{ width: 232 }}
            />
          </Space>

          <Space>
            Дата действия
            <DatePicker
              format="YYYY-MM-DD"
              value={moment(proxy?.endDate) || null}
              onChange={(date) =>
                setProxy(
                  { ...proxy, endDate: date },
                  ProxyHeaderService.updateRecord({
                    ...proxy,
                    endDate: date,
                  })
                )
              }
              style={{ width: 232 }}
            />
          </Space>

          <Space>
            Доверенность выдана:{" "}
            <strong>
              <Select
                value={proxy?.organizationid || null}
                onChange={(value) =>
                  setProxy(
                    { ...proxy, organizationid: value },
                    ProxyHeaderService.updateRecord({
                      ...proxy,
                      organizationId: value,
                    })
                  )
                }
                placeholder={"Выберите организацию"}
                style={{ width: 425 }}
              >
                {organizations.map((it) => (
                  <Option value={it.id}>{it.title}</Option>
                ))}
              </Select>
            </strong>
          </Space>

          <Space>
            Получатель:{" "}
            <strong>
              <Select
                value={proxy?.individualid || null}
                onChange={(value) =>
                  setProxy(
                    { ...proxy, individualid: value },
                    ProxyHeaderService.updateRecord({
                      ...proxy,
                      individualId: value,
                    })
                  )
                }
                placeholder={"Выберите получателя"}
                style={{ width: 425 }}
              >
                {individuals.map((it) => (
                  <Option value={it.id}>
                    {it.lastName} {it.firstName} {it.patronymic}
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

      <ProxyBodyDialog
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
        products={products}
        proxyheaderid={id}
      />
    </div>
  );
};
