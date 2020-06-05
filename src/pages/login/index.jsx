import React from "react";
import "./index.scss";
import { Input, Space, Card, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, EditOutlined } from '@ant-design/icons';
import 'antd/es/input/style/css'
import 'antd/es/space/style/css'
import 'antd/es/card/style/css'
import 'antd/es/button/style/css'
// eslint-disable-next-line

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            passwd: '',
            loadings: false
        };

    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangePasswd(e){
        this.setState({
            passwd: e.target.value
        })
    }

    enterLoading() {
        this.setState({
            loadings: true
        },()=> {
            if(this.state.name==="admin" && this.state.passwd==="123456"){
                this.props.history.push('/select');
            } else{
                alert("密码或账户名错误！")
                this.setState({
                    loadings: false
                })
            }
            }
        );

    };

    render() {
        return (
            <div className='background'>
                <div className='card'>
            <Card title="用户登陆" bordered={false} style={{ width: 400, height: 300 }}
                  headStyle={{textAlign: "center"}}
                  bodyStyle={{display: "flex",justifyContent:"center",alignItems:"center"}}
            >
                <Space direction="vertical">
                <Input onChange={this.onChangeName.bind(this)} placeholder="input name" prefix={<UserOutlined />} style={{width: 250}} className='input1'/>
                <Input.Password
                    value={this.state.passwd}
                    onChange={this.onChangePasswd.bind(this)}
                    placeholder="input password"
                    className='input'
                    prefix={<EditOutlined/>}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                    <Button className='button' type="primary" loading={this.state.loadings} onClick={() => this.enterLoading()}>
                        Click me!
                    </Button>
            </Space>
            </Card>
                </div>
            </div>
        );
    }
}

export default HomePage;