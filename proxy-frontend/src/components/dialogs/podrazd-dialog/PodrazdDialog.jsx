import { Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import PodrazdService from "../../../api/services/podrazd-service.js";

export const PodrazdDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  ...props
}) => {
  const [nameOrg, setnameOrg] = useState("");

  useEffect(() => {
    if (currentRecord) {
      setnameOrg(currentRecord);
    } else {
      setnameOrg("");
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    const record = currentRecord
      ? await PodrazdService.updateRecord({
          id: currentRecord.id,
          nameOrg,
        })
      : await PodrazdService.createRecord({ nameOrg });
    onOk(record);
  };
  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Input
        value={nameOrg}
        onChange={(e) => setnameOrg(e.target.value)}
        placeholder="Укажите наименование"
      />
    </Modal>
  );
};
