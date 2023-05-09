import { Space } from "antd";
import {Table} from "antd";
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import PlaceService from "../../api/services/place-service";
import { PlaceDialog } from "../../components/dialogs/place-dialog/PlaceDialog";
import { Button } from "antd/es/radio";

    export const PlaceView = ({
        ...props
    }) => {

        const columns = [
            {
                title: 'Код',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Наименование', 
                dataIndex: 'title', 
            },
            {
                title: 'Действия',
                key: 'actions',
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

                    )
                }
            }
        ]
        const [currentRecord, setCurrentRecord] = useState(null);
        const [visible, setVisible] = useState(false);
    
        
        const [list, setList] = useState([]);

        useEffect(async () => {
            const list = await PlaceService.getAllRecords();
            setList(list);
            return () => setList([]);
        }, [])

        const deleteRecordHandler = async (recordId) => {
            await PlaceService.removeRecord(recordId);
            setList(list.filter(it => it.id !== recordId));
        }
        const createRecordHandler = () => {
            setCurrentRecord(null)
            setVisible(true);
        }
        const updateRecordHandler = (record) => { 
            setCurrentRecord(record)
            setVisible(true)
        }
    

        return (
            <div style={{ padding: 16 }}>
            <Table dataSource={list} columns={columns} />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <div style={{ padding: 16 }}>
                <PlaceDialog
                    visible={visible}
                    onOk={(record) => {
                        currentRecord
                            ? setList(list.map(it => it.id === currentRecord.id
                                ? { ...record }
                                : it))
                            : setList([...list, record]);
                            
                            setCurrentRecord(null);
                            setVisible(false);
                    }}
                    onCancel={() => setVisible(false)}
                    currentRecord={currentRecord}
                />
            </div>
        </div>

        )
    }
