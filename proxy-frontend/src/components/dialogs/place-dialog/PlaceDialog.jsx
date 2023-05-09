import { Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import PlaceService from "../../../api/services/place-service";

export const PlaceDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (currentRecord) {
            setTitle(currentRecord.title);
        } else {
            setTitle('');
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await PlaceService.updateRecord({
                    id: currentRecord.id,
                    title,  
                })
                : await PlaceService.createRecord({ title })
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >

            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Укажите наименование"
            />

        </Modal>
    )
}
