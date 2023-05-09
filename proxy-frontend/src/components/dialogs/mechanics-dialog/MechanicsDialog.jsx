import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState} from "react";
import MechanicsService from "../../../api/services/mechanics-service";

export const MechanicsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
        ...props
}) => {
    const [mechanics, setMechanics] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setMechanics(currentRecord);
        } else {
            setMechanics(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record = 
            currentRecord
                ? await MechanicsService.updateRecord({
                    id: currentRecord.id,
                    ...mechanics,
                })
                : await MechanicsService.createRecord(mechanics)
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
                        value={mechanics?.lastName || ''}
                        onChange={e => setMechanics({...mechanics, lastName: e.target.value})}
                        placeholder="Укажите фамилию"
                    />

                    <Input
                        value={mechanics?.firstName || ''}
                        onChange={e => setMechanics({...mechanics, firstName: e.target.value})}
                        placeholder="Укажите имя"
                    />

                    <Input
                        value={mechanics?.patronymic || ''}
                        onChange={e => setMechanics({...mechanics, patronymic: e.target.value})}
                        placeholder="Укажите отчество"
                    />

                </Space>

                    <Input 
                        value={mechanics?.issued || ''}
                        onChange={e => setMechanics({...mechanics, issued: e.target.value})}
                        placeholder="Укажите, кем выдан документ"
                    />


                <Space align="center">
                    <Input 
                        value={mechanics?.series || ''}
                        onChange={e => setMechanics({...mechanics, series: e.target.value})}
                        placeholder="Укажите серию"
                    />

                    <Input 
                        value={mechanics?.number || ''}
                        onChange={e => setMechanics({...mechanics, number: e.target.value})}
                        placeholder="Укажите номер"
                    />
                </Space>

            </Space>
        </Modal>
    )
   
}