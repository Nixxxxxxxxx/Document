import { Space } from "antd";
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ProductService from "../../api/services/products-service";
import { ProductDialog } from "../../components/dialogs/products-dialog/ProductDialog";
import { Button } from "antd/es/radio";

export const ProductsView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      dataIndex: "title",
      key: "id",
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
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  /**
   *  локальное состояние компонента
   *  здесь будет храниться список товаров
   */
  const [list, setList] = useState([]);

  /**
   * в момент, когда компонент отрисован,
   * вызывается запрос на получение списка товаров
   */
  useEffect(() => {
    async function fetchData() {
      /**
       * запрос - это асинхронная функция
       */
      const list = await ProductService.getAllRecords();
      /**
       * после того, как список получен,
       * устанавливаем его в локальное состояние
       */
      setList(list);
      /**
       * когда компонент будет демонтирован со страницы,
       * очищаем локальное состояние
       */
      return () => setList([]);
    }
    fetchData();
  }, []);

  const deleteRecordHandler = async (recordId) => {
    await ProductService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };
  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };
  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  return (
    <div style={{ padding: 16 }}>
      <Table dataSource={list} columns={columns} />
      <Button onClick={createRecordHandler}>Создать</Button>
      <div style={{ padding: 16 }}>
        <ProductDialog
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
        />
      </div>
    </div>
  );
};
