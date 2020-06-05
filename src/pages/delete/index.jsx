import React from 'react';
import { Layout, Menu, Table, Space, Alert, Select as Selector, Popconfirm, message  } from 'antd';
import 'antd/es/table/style/css'
import 'antd/es/tag/style/css'
import 'antd/es/space/style/css'
import 'antd/es/layout/style/css'
import 'antd/es/menu/style/css'
import 'antd/es/popconfirm/style/css'
import 'antd/es/message/style/css'
import 'antd/es/alert/style/css'
import 'antd/es/select/style/css'
import './index.scss';


const {Option} = Selector


class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            id: 0,
            alert: false,
            errorMessage: ''
        };
        this.getContent = this.getContent.bind(this)
        this.deleteContent = this.deleteContent.bind(this)
    }

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


    onClose(){
        console.log('我关闭了')
    }

    deleteContent(path){
        let pathUrl = ''
        let refresh = ["student", "course", "choose"][this.state.id]
        switch (this.state.id){
            case 0: pathUrl = pathUrl + 'deleteStudent?stu_num=' + path.stu_num;break;
            case 1: pathUrl = pathUrl + 'deleteCourse?cour_num=' + path.cour_num;break;
            default: pathUrl = pathUrl + 'deleteChoose?stu_numC=' + path.stu_numC + '&cour_numC=' + path.cour_numC;break;
        }
        console.log(pathUrl)
        fetch('http://112.124.25.19:3000/'  + pathUrl,{
            method: 'GET',
            // body:formData,
            dataType: "text"
        }).then(
            (response)=>{
                console.log(response)
                response.json().then((data)=>{
                    console.log(data)
                    if(data.sqlMessage!== undefined) {
                        this.setState({
                            errorMessage: data.sqlMessage
                        })
                        message.error("删除失败")
                    } else {
                        message.success('删除成功!');
                        this.getContent(refresh)
                    }
                })
            }
        ).catch(function(err){
            console.log("Fetch错误:"+err);
        });
    }




    cancel(e) {
        console.log(e);
        message.error('取消删除！');
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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="确定删除这条记录吗？"
                            onConfirm={()=>{this.deleteContent(record)}}
                            onCancel={this.cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                        <a>删除</a>
                        </Popconfirm>
                    </Space>
                ),
            },
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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="确定删除这条记录吗？"
                            onConfirm={()=>{this.deleteContent(record)}}
                            onCancel={this.cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </Space>
                ),
            },

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
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="确定删除这条记录吗？"
                            onConfirm={()=>{this.deleteContent(record)}}
                            onCancel={this.cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </Space>
                ),
            },
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

    choose(value){
        this.getContent(value)
    }

    render() {
        const ShowAlert = ({message}) => {
            if(message !== ''){
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
        const { Header, Content } = Layout;
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1" onClick={this.go.bind(this)}>查询</Menu.Item>
                        <Menu.Item key="2" onClick={this.go.bind(this)}>增加</Menu.Item>
                        <Menu.Item key="3" onClick={this.go.bind(this)}>修改</Menu.Item>
                        <Menu.Item key="4" onClick={this.go.bind(this)}>删除</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    请选择数据表：
                    <Selector className='select' defaultValue="student" style={{ width: 120 }} onChange={this.choose.bind(this)}>
                        <Option value="student">学生表</Option>
                        <Option value="course">课程表</Option>
                        <Option value="choose">选课表</Option>
                    </Selector>
                    <ShowAlert message={this.state.errorMessage}></ShowAlert>
                    <Table columns={this.state.columns} dataSource={this.state.data}
                           // onRow={this.onClickRow.bind(this)}
                    />
                </Content>
            </Layout>
        );
    }
}

export default Delete;
