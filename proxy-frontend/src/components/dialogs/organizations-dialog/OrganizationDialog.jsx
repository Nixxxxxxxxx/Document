import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState} from "react";
import OrganizationService from "../../../api/services/organization-service";

export const OrganizationDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
        ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record = 
            currentRecord
                ? await OrganizationService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await OrganizationService.createRecord(organization)
        onOk(record);
    }

    return (
        <Modal
        visible={visible}
        title={currentRecord ? 'Редактировать' : 'Создать'}
        onOk={onOkHandler}
        onCancel={onCancel}
        >
            <Space direction="vertical">
                <Space>
                    <Input
                        value={organization?.title || ''}
                        onChange={e => setOrganization({...organization, title: e.target.value})}
                        placeholder="Укажите название"
                    />

                    <Input
                        value={organization?.inn || ''}
                        onChange={e => setOrganization({...organization, inn: e.target.value})}
                        placeholder="Укажите ИНН"
                    />

                </Space>

            </Space>
        </Modal>
    )
   
}