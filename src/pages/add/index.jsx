import React from 'react';
import { Modal, Form, Input, message, Layout, Menu, Table, Button, Alert, Select as Selector } from 'antd';
import 'antd/es/alert/style/css'
import 'antd/es/message/style/css'
import 'antd/es/modal/style/css'
import 'antd/es/form/style/css'
import 'antd/es/input/style/css'
import 'antd/es/radio/style/css'
import 'antd/es/table/style/css'
import 'antd/es/tag/style/css'
import 'antd/es/space/style/css'
import 'antd/es/layout/style/css'
import 'antd/es/menu/style/css'
import 'antd/es/select/style/css'
import 'antd/es/button/style/css'
import './index.scss';

const {Option} = Selector

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            data: [],
            columns: [],
            visible: false,
            errorMessage: ''
        };
        this.getContent = this.getContent.bind(this)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    go({item, key}){
        console.log(123)
        switch(key){
            case "1": this.props.history.push('/select'); break;
            case "2": this.props.history.push('/add'); break;
            case "3": this.props.history.push('/alter'); break;
            default: this.props.history.push('/delete'); break;
        }

    }
    componentDidMount() {
        this.getContent("student")
    }

    getContent(path){
        const columnsStu = [
            {
                title: '学号',
                dataIndex: 'stu_num',
                key: 'stu_num',
                render: text => <a>{text}</a>,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex'
            },
            {
                title: '所在系',
                dataIndex: 'depart',
                key: 'depart'
            }
        ]
        const columnsCou = [
            {
                title: '课程号',
                dataIndex: 'cour_num',
                key: 'cour_num',
                render: text => <a>{text}</a>,
            },
            {
                title: '课程名',
                dataIndex: 'cour_name',
                key: 'cour_name'
            },
            {
                title: '先行课',
                dataIndex: 'pre',
                key: 'pre'
            }

        ]
        const columnsCho = [
            {
                title: '学号',
                dataIndex: 'stu_numC',
                key: 'stu_numC',
                render: text => <a>{text}</a>,
            },
            {
                title: '课程号',
                dataIndex: 'cour_numC',
                key: 'cour_numC',
                render: text => <a>{text}</a>,
            },
            {
                title: '成绩',
                dataIndex: 'grade',
                key: 'grade'
            }
        ]
        const columns = [columnsStu, columnsCou, columnsCho]
        let id = ["student", "course", "choose"].indexOf(path)
        fetch('http://112.124.25.19:3000/' + 'get' + path,{
            method: 'GET',
            // body:formData,
            dataType: "text"
        }).then(
            (response)=>{
                response.json().then((data)=>{
                    this.setState({
                        columns: columns[id],
                        data: data,
                        id: id
                    })
                }).bind(this);
            }
        ).catch(function(err){
            console.log("Fetch错误:"+err);
        });
    }

    getPathUrl(values){
        let path = '?'
        for (let key in values){
            path = path + key
            path = path + '='
            path = path + values[key]
            path = path + '&'
        }
        path=path.substring(0,path.length-1)
        console.log(path)
        return path
    }


    postContent(body){
        let pathUrl = this.getPathUrl(body)
        let target = ['addStudent', 'addCourse', 'addChoose'][this.state.id]
        let refresh = ["student", "course", "choose"][this.state.id]
        // console.log('http://127.0.0.1:3000/' + target + pathUrl)
        fetch('http://112.124.25.19:3000/' + target + pathUrl,{
            method: 'GET',
            // body:formData,
            dataType: "text"
        }).then(
            (response)=>{
                console.log(response)
                response.json().then((data)=>{
                    console.log(data)
                    if(data.sqlMessage!= undefined) {
                        this.setState({
                            errorMessage: data.sqlMessage
                        })
                        message.error("增加失败")
                    } else {
                        message.success('增加成功!');
                        this.getContent(refresh)
                    }
                })
            }
        ).catch(function(err){
            console.log("Fetch错误:"+err);
        });
    }

    choose(value){
        this.getContent(value)
    }

    onFinish(value){
        console.log(value)
    }



    render() {
        const ShowAlert = ({message}) => {
            if(message != ''){
                return (
                    <Alert
                        message="操作失败"
                        description={message}
                        type="error"
                        closable
                        showIcon
                        onClose={()=>{
                            this.setState({
                                errorMessage: ''
                            })
                        }}
                    />
                )
            } else {
                return (<div></div>)
            }
        }

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const { Header, Content } = Layout;

        const ModalForm = ({ visible, onCancel}) => {
            const [form] = Form.useForm()

            const onOK = () => {
                form.submit()
            }
            return (
                <Modal
                    title="增加数据"
                    visible={visible}
                    onOk={onOK}
                    onCancel={onCancel}
                >
                  {this.state.id === 0 ?
                    <Form
                        {...layout}
                        name="userForm"
                        initialValues={{
                            remember: true
                        }}
                        form={form}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="学号"
                            name="stu_num"
                            rules={[{ required: true, message: 'Please input your stu_num!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="姓名"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="年龄"
                            name="age"
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="性别"
                            name="sex"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="所在系"
                            name="depart"
                        >
                            <Input />
                        </Form.Item>
                    </Form> : null}

                    {this.state.id === 1 ?
                    <Form
                        {...layout}
                        name="userForm"
                        initialValues={{ remember: true }}
                        form={form}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="课程号"
                            name="cour_num"
                            rules={[{ required: true, message: 'Please input your cour_num!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="课程名"
                            name="cour_name"
                            rules={[{ required: true, message: 'Please input your cour_name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="先行课"
                            name="age"
                        >
                            <Input />
                        </Form.Item>
                    </Form> : null}

                    {this.state.id === 2 ?
                        <Form
                            {...layout}
                            name="userForm"
                            initialValues={{ remember: true }}
                            form={form}
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="学号"
                                name="stu_numC"
                                rules={[{ required: true, message: 'Please input your cour_num!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="课程号"
                                name="cour_numC"
                                rules={[{ required: true, message: 'Please input your cour_name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="成绩"
                                name="grade"
                                rules={[{ required: true, message: 'Please input your grade!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form> : null}

                </Modal>
            )
        }




        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" onClick={this.go.bind(this)}>查询</Menu.Item>
                        <Menu.Item key="2" onClick={this.go.bind(this)}>增加</Menu.Item>
                        <Menu.Item key="3" onClick={this.go.bind(this)}>修改</Menu.Item>
                        <Menu.Item key="4" onClick={this.go.bind(this)}>删除</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    请选择数据表：
                    <Selector defaultValue="student" style={{ width: 120 }} onChange={this.choose.bind(this)}>
                        <Option value="student">学生表</Option>
                        <Option value="course">课程表</Option>
                        <Option value="choose">选课表</Option>
                    </Selector>


                    <Form.Provider
                        onFormFinish={(name, { values, forms }) => {
                            this.postContent(values)
                            this.handleCancel()
                        }}>
                    <Button className='button' type="primary" onClick={this.showModal}>点我增加数据</Button>
                        <ModalForm visible={this.state.visible} onCancel={this.handleCancel}/>

                    </Form.Provider>


                    <ShowAlert message={this.state.errorMessage}></ShowAlert>


                    <Table columns={this.state.columns} dataSource={this.state.data} />
                </Content>
            </Layout>
        );
    }
}

export default Add;
