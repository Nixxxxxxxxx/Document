import { Space, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState, UseRef} from "react";
import { MechanicsDialog } from "../../components/dialogs/mechanics-dialog/MechanicsDialog";
import MechanicsService from "../../api/services/mechanics-service";


export const MechanicsView = ({
        ...props
}) => {

    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
        },
        {
            title: 'Имя',
            dataIndex: 'firstName',
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
        },
        {
            title: 'Кем выдан паспорт',
            dataIndex: 'issued',
        },
        {
            title: 'Серия',
            dataIndex: 'series',
        },
        {
            title: 'Номер',
            dataIndex: 'number',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <div onClick={() => updateRecordHandler(record)}>
                            <EditOutlined/>
                        </div>
                        
                        <div onClick={() => deleteRecordHandler(record.id)}>
                            <DeleteOutlined/>
                        </div>
                    </Space>
                )
            }
        }
    ];

    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false); 

    useEffect(async () => {
        const list = await MechanicsService.getAllRecords();
        setList(list);
        return () => setList([]);
    }, [])

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async(recordId) => {
        await MechanicsService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }


    return (
       <div style={{padding: 16}}>
            <Table dataSource={list} columns={columns}/>
            <Button onClick={createRecordHandler}>
            Создать
            </Button>
            <MechanicsDialog 
                visible={visible}
                onOk={(record) => {
                    currentRecord
                        ? setList(list.map(it => it.id === currentRecord.id
                            ? {...record }
                            : it))
                        : setList([...list, record]);
                            
                        setCurrentRecord(null);
                        setVisible(false);

                }}
                onCancel={() => setVisible(false)}
                currentRecord={currentRecord}
            />
    
        </div>
    )
}