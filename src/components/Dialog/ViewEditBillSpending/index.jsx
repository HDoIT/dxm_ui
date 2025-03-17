import React, { useEffect, useRef, useState } from 'react';
import { ProForm, ProFormMoney, ProFormSwitch } from '@ant-design/pro-components';
import { message } from 'antd';
import { Button, Modal } from 'antd'

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const ViewEditBillSpending = ({ openEdit, setOpenEdit }) => {
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpenEdit(openEdit);
    }, [openEdit, setOpenEdit]);


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenEdit(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpenEdit(false);
    };
    const formRef = useRef();

    const [readonly, setReadonly] = useState(false);
    
    return (
        <>
            <Modal
                open={openEdit}
                title="Thêm hóa đơn chi tiêu 2"
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Search on Google
                    </Button>,
                ]}
            >
                <ProFormSwitch
                    checkedChildren="Edit"
                    unCheckedChildren="View"
                    label="Switch form"
                    fieldProps={{
                        onChange: setReadonly,
                    }}
                />
                <ProForm
                    onFinish={async (values) => {
                        await waitTime(2000);
                        console.log(values);
                        const val1 = await formRef.current?.validateFields();
                        console.log('validateFields:', val1);
                        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
                        console.log('validateFieldsReturnFormatValue:', val2);
                        message.success('Thành công');
                    }}
                    formRef={formRef}
                    params={{ id: '100' }}
                    formKey="base-form-use-demo"
                    readonly={!readonly}
                    request={async () => {
                        await waitTime(100);
                        return {
                            name: '1',
                            useMode: 'chapter',
                        };
                    }}
                    autoFocusFirstInput
                >
                    <ProFormMoney
                        label="2"
                        name="amount0"
                        fieldProps={{
                            moneySymbol: false,
                        }}
                        locale="en-US"
                        initialValue={22.22}
                        min={0}
                        width="lg"
                    />
                    <ProFormMoney
                        label="3"
                        name="amount1"
                        locale="en-US"
                        initialValue={22.22}
                        min={0}
                        width="lg"
                    />
                    <ProFormMoney
                        label="4"
                        name="amount2"
                        locale="en-US"
                        initialValue={22.22}
                        min={0}
                        trigger="onBlur"
                    />
                    <ProFormMoney
                        label="5"
                        name="amount3"
                        locale="en-GB"
                        initialValue={22.22}
                    />
                    <ProFormMoney
                        label="6"
                        name="amount4"
                        initialValue={22.22}
                    />
                    <ProFormMoney
                        label="7 ms-MY"
                        name="amount-ms-My"
                        locale="ms-MY"
                        initialValue={-22.22}
                    />
                    <ProFormMoney
                        label="8 zh-TW"
                        name="amount-zh-TW"
                        locale="zh-TW"
                        initialValue={22.22}
                    />
                    <ProFormMoney
                        label="9"
                        name="amount5"
                        initialValue={22.22}
                        customSymbol="💰"
                    />
                    <ProFormMoney
                        label="10"
                        name="amount6"
                        initialValue={2222222222.222222}
                        fieldProps={{ precision: 2 }}
                        customSymbol="💰"
                    />
                    <ProFormMoney
                        label="11-0"
                        name="amount6"
                        initialValue={2222222222.222222}
                        fieldProps={{ precision: 0 }}
                        customSymbol="💰"
                    />
                </ProForm>
            </Modal>

        </>
    );
};

