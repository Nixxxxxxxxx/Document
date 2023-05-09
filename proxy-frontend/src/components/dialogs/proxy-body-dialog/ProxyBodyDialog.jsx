import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from 'antd';
import ProxyBodyService from "../../../api/services/proxy-body-service";

const { Option } = Select;

export const ProxyBodyDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    products,
    proxyheaderid,
    ...props
}) => {
    const [proxyBody, setProxyBody] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setProxyBody(currentRecord);
        } else {
            setProxyBody(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await ProxyBodyService.updateRecord({
                    id: currentRecord.id,
                    ...proxyBody,
                })
                : await ProxyBodyService.createRecord({ ...proxyBody, proxyheaderid })
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

                <Select
                    value={proxyBody?.productid || null}
                    onChange={value => setProxyBody({ ...proxyBody, productid: value })}
                    placeholder={"Выберите продукт"}
                    style={{ width: '100%' }}
                >
                    {products.map(it => <Option
                        value={it.id}>
                        {it.title}
                    </Option>)}
                </Select>

                <Space>

                    <Input
                        value={proxyBody?.unit || ''}
                        onChange={e => setProxyBody({ ...proxyBody, unit: e.target.value })}
                        placeholder="Укажите ед. измерения"
                    />

                    <Input
                        value={proxyBody?.count || ''}
                        onChange={e => setProxyBody({ ...proxyBody, count: e.target.value })}
                        placeholder="Укажите количество"
                    />

                </Space>

            </Space>

        </Modal>
    )
}
