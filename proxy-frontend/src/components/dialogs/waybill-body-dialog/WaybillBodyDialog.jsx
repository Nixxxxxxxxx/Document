import { Input, Space, DatePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "antd";
import WaybillBodyService from "../../../api/services/waybill-body-service";

const { Option } = Select;

export const WaybillBodyDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  individuals,
  waybillheaderid,
  products,
  ...props
}) => {
  const [waybillBody, setWaybillBody] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setWaybillBody(currentRecord);
    } else {
      setWaybillBody(null);
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    const record = currentRecord
      ? await WaybillBodyService.updateRecord({
          id: currentRecord.id,
          ...waybillBody,
        })
      : await WaybillBodyService.createRecord({
          ...waybillBody,
          waybillheaderid,
        });
    onOk(record);
  };

  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical">
        <Select
          value={waybillBody?.individualid || null}
          onChange={(value) =>
            setWaybillBody({ ...waybillBody, individualid: value })
          }
          placeholder={"fio"}
          style={{ width: "100%" }}
        >
          {individuals.map((it) => (
            <Option value={it.id}>{it.lastName}</Option>
          ))}
        </Select>
        <Select
          value={waybillBody?.products || null}
          onChange={(value) =>
            setWaybillBody({ ...waybillBody, productid: value })
          }
          placeholder={"Выберите продукт"}
          style={{ width: "100%" }}
        >
          {products.map((it) => (
            <Option value={it.id}>{it.title}</Option>
          ))}
        </Select>
        <Space>
          <Input
            value={waybillBody?.unit || ""}
            onChange={(e) =>
              setWaybillBody({ ...waybillBody, unit: e.target.value })
            }
            placeholder="Укажите ед измерения"
          />
          <Input
            value={waybillBody?.count || ""}
            onChange={(e) =>
              setWaybillBody({ ...waybillBody, count: e.target.value })
            }
            placeholder="Укажите количество"
          />
        </Space>
        <Space style={{ width: "100%" }}>
          <DatePicker
            value={waybillBody?.expdate}
            onChange={(date) =>
              setWaybillBody({ ...waybillBody, expdate: date })
            }
            placeholder={"Укажите дату списания"}
            style={{ width: 232 }}
          />
        </Space>
      </Space>
    </Modal>
  );
};
