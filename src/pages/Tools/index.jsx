import { Button, Card, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { convert } from 'html-to-text'; // Thêm thư viện chuyển đổi HTML sang plain text
import { sendEmail } from '../../actions/toolAction';

const Tools = () => {
    const [detail, setDetail] = useState(''); // Nội dung email (HTML)
    const [selectedEmails, setSelectedEmails] = useState([]); // Danh sách email được chọn
    const [dataSource, setDataSource] = useState('GoogleSheet'); // Nguồn dữ liệu
    const [spreadsheetId, setSpreadsheetId] = useState(''); // ID của spreadsheet
    const [apiKey, setApiKey] = useState(''); // API key
    const [range, setRange] = useState(''); // Phạm vi dữ liệu
    const [subject, setSubject] = useState(''); // Tiêu đề email

    const dispatch = useDispatch();
    const { loading, success, error, response } = useSelector((state) => state.email);

    // Hàm xử lý khi người dùng chọn email
    const handleEmailChange = (value) => {
        setSelectedEmails(value);
    };

    // Hàm xử lý khi người dùng thay đổi nguồn dữ liệu
    const handleDataSourceChange = (value) => {
        setDataSource(value);
    };

    // Hàm xử lý khi người dùng nhấn nút Send
    const handleSend = () => {
        // Kiểm tra các trường bắt buộc
        if (!selectedEmails.length || !spreadsheetId || !apiKey || !range || !subject || !detail) {
            message.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Chuyển đổi nội dung từ HTML sang plain text
        const plainTextContent = convert(detail, {
            wordwrap: false, // Tắt tự động xuống dòng
        });

        // Tạo dữ liệu để gửi lên API
        const emailData = {
            apiKey,
            spreadsheetId,
            range,
            subject,
            content: plainTextContent // Sử dụng nội dung plain text
            // emails: selectedEmails.join(','), // Chuyển mảng email thành chuỗi phân cách bằng dấu phẩy
        };

        // Dispatch action để gửi email
        dispatch(sendEmail(emailData));
    };

    // Tạo danh sách email giả lập
    const optionss = [];
    for (let i = 0; i < 100000; i++) {
        const value = `${i.toString(36)}${i}@example.com`;
        optionss.push({
            label: value,
            value,
            disabled: i === 10,
        });
    }

    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Card
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                    borderRadius: 8,
                    width: '100%',
                }}
            >
                <div>
                    <span>From</span>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select email to send"
                        defaultValue={[]}
                        onChange={handleEmailChange}
                        options={optionss}
                        disabled
                    />
                </div>
                <div style={{
                        marginTop: 16,
                    }}>(To) Get Data From :</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                    }}
                >
                    <Select
                        defaultValue="GoogleSheet"
                        style={{ width: 200 }}
                        onChange={handleDataSourceChange}
                        options={[
                            { value: 'GoogleSheet', label: 'GoogleSheet' },
                            { value: 'Excel', label: 'Excel' },
                        ]}
                    />
                    <Input
                        placeholder="Spreadsheet ID..."
                        value={spreadsheetId}
                        onChange={(e) => setSpreadsheetId(e.target.value)}
                    />
                    <Input
                        placeholder="API Key..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                {/* <div style={{ marginTop: 16 }}>
                    
                </div> */}
                <div style={{ marginTop: 16 }}>
                    <p style={{ width: 200 }}>Range </p>
                    <Select
                        defaultValue="Sheet1"
                        style={{ width: 200 }}
                        onChange={handleDataSourceChange}
                        options={[
                            { value: 'Sheet1', label: 'Đọc toàn bộ sheet1' },
                            { value: 'Sheet1!A:A', label: 'Đọc toàn bộ cột A' },
                            { value: 'Sheet1!1:1', label: 'Đọc toàn bộ hàng 1' },
                        ]}
                    />
                </div>
                <div style={{ marginTop: 16 }}>
                    <Input
                        placeholder="Subject..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <ReactQuill
                    theme="snow"
                    value={detail || ''}
                    onChange={(html) => setDetail(html)}
                    placeholder='Content...'
                    style={{
                        marginBottom: '50px',
                        height: '50vh',
                    }}
                />
                <Button
                    type="primary"
                    loading={loading}
                    onClick={handleSend}
                >
                    Send
                </Button>
            </Card>
            <Card
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                    borderRadius: 8,
                    width: '50%',
                }}
            >
                <TextArea rows={20} value={JSON.stringify(response, null, 2)} disabled />
            </Card>
        </Content>
    );
};

export default Tools;