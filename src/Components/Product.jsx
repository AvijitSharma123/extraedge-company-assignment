import './Product.css'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, getUserFailure, getUserRequest, getUserSuccess, sendNewData } from '../Redux/action'
import axios from 'axios';

import { Card, Col, Row, Modal, Form, Input, Button, Spin } from 'antd';
import { HeartOutlined,HeartTwoTone, EditOutlined, DeleteFilled, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, HeartFilled, BorderBottomOutlined, BorderOuterOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';


const Product = () => {

   
const users= useSelector((store)=>store.users)
const loading =useSelector((store)=>store.isLoading)
const dispatch=useDispatch();

const [isModalVisible, setIsModalVisible] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [likedUsers, setLikedUsers] = useState(new Set());
const [form] = Form.useForm();




console.log(users)
const getUserData=async()=>{
    try {
        dispatch(getUserRequest());
        const userData=await axios.get("https://jsonplaceholder.typicode.com/users");

        const usersWithAvatars = await Promise.all(
            userData.data.map(async (user) => {
              const avatarResponse = await fetch(
                `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`
              );
              const avatarUrl = avatarResponse.url; // URL to the generated avatar
              return { ...user, avatar: avatarUrl };
            })
          );
        // dispatch(getUserSuccess(userData.data))
        dispatch(getUserSuccess(usersWithAvatars))
    } catch (error) {
        dispatch(getUserFailure())
    }
}

//==================================================
const updatedDataOfUser=()=>{

  if(currentUser){
    console.log(currentUser)
  const {id}=currentUser;
 const newData= users.map((item)=>{
        if(item.id===id){
          return {
            ...item,...currentUser
          }
        }else{
          return {
            ...item
          }
        }
  })
  // dispatch(sendNewData(newData))
  console.log(newData);
}
}
//=======================================================

useEffect(()=>{
    getUserData();
},[])

// useEffect(()=>{
//   updatedDataOfUser();
// },[currentUser])




const showModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsModalVisible(true);
  };
//===============================================================================
  const handleOk = () => {
    form.validateFields().then((values) => {
      setCurrentUser((prev)=>{ 
        const updatedUser = { ...prev, ...values }
        return updatedUser;
      })
      // console.log('Updated user:', values);
      setIsModalVisible(false);
    });

    setTimeout(()=>{updatedDataOfUser()},1000)
    
  
   
    
  };
  
  console.log(currentUser);
//=================================================================================
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleLike = (userId) => {
    setLikedUsers((prev) => {
      const newLikedUsers = new Set(prev);
      if (newLikedUsers.has(userId)) {
        newLikedUsers.delete(userId);
      } else {
        newLikedUsers.add(userId);
      }
      return newLikedUsers;
    });
  };

  const handleDelete=(userId)=>{
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });

      let filteredData= users.filter((user)=>user.id!==userId);
      dispatch(deleteUser(filteredData))
      console.log("delete button clicked")
  }



  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="container">
      <Row gutter={[16,16]} style={{}}>
        {users.map(user => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              // hoverable
              cover={
                <img
                style={{backgroundColor:"#f0f5f5", height:"30%"}}
                  alt={`${user.username}'s avatar`}
                  src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
                  height={100}
                />
              }
              actions={[

                <HeartFilled
                
                  key="heart"
                  onClick={() => toggleLike(user.id)}
                //   style={{ color: likedUsers.has(user.id) ? 'red' : 'inherit' }}
                  style={{ 
                    color: likedUsers.has(user.id) ? 'red' : 'rgba(0, 0, 0, 0.45)',
                    fontSize: '18px'
                  }}
                />,
                <EditOutlined key="edit" onClick={() => showModal(user)} />,
                <DeleteFilled  key="delete" onClick={()=>handleDelete(user.id)}/>
              ]}
            >
              <Card.Meta
                title={user.name}
                description={
                  <>
                    <p><MailOutlined /> {user.email}</p>
                    <p><PhoneOutlined /> {user.phone}</p>
                    <p><GlobalOutlined /> {user.website}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}

        styles={{ footer: {
          borderTop: '1px solid #333',
          paddingTop:"10px"
        },
        // title:{
        //    BorderOuterOutlined: '1px solid #333',
        //   paddingBottom:"10px"
        // }
      }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form form={form} 
           labelCol={{span:8}}
           wrapperCol={{span:17}}
          //  onFinish={(values)=>{
          //   console.log({values});
          //  }}
           >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please input the website!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );


}

export default Product

//layout="vertical"