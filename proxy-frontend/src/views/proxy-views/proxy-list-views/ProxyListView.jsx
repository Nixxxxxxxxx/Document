import { Space, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import IndividualService from "../../../api/services/individuals-service";
import OrganizationService from "../../../api/services/organization-service";
import ProxyHeaderService from "../../../api/services/proxy-head-service";
import { ProxyHeadersDialog } from "../../../components/dialogs/proxy-header-dialog/ProxyHeadersDialog";
import { useNavigate } from "react-router-dom";

const s = require("./style.module.css");

export const ProxyListView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата выписки",
      dataIndex: "dischargeDate",
    },
    {
      title: "Дата окончания",
      dataIndex: "endDate",
    },
    {
      title: "Физ. лицо",
      dataIndex: "individualid",
      render: (text, record) =>
        individuals.find((it) => it.id === record.individualid)?.lastName,
    },
    {
      title: "Организация",
      dataIndex: "organizationid",
      render: (text, record) =>
        organizations.find((it) => it.id === record.organizationid)?.title,
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

  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const individuals = await IndividualService.getAllRecords();
      const organizations = await OrganizationService.getAllRecords();
      const list = await ProxyHeaderService.getAllRecords();
      setIndividuals(individuals);
      setOrganizations(organizations);
      setList(list);
      return () => setList([]);
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
    await ProxyHeaderService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
          onDoubleClick: (event) => {
            navigate(`/proxy/${record.id}`);
          },
        })}
      />
      <Button onClick={createRecordHandler}> Создать </Button>
      <ProxyHeadersDialog
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
        individuals={individuals}
        organizations={organizations}
      />
    </div>
  );
};
