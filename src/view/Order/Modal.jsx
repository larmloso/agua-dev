import React, { useEffect, useState } from 'react'
import { Modal, Col, Row, Divider, Input, Form, Button, Select } from 'antd'
import { InsertProducts, FetchAllMember } from '../../services'

//imort google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'

// default lat,lng
let newLatLng = [{ lat: 15.118524429823255, lng: 104.9075726928711 }]

const onMarkerDragEnd = (event) => {
  newLatLng[0].lat = event.latLng.lat()
  newLatLng[0].lng = event.latLng.lng()
  console.log('newLat', newLatLng[0].lat, 'newLng', newLatLng[0].lng)
}

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={newLatLng[0]}
    >
      <Marker
        draggable={true}
        position={newLatLng[0]}
        onDragEnd={(e) => onMarkerDragEnd(e)}
      />
    </GoogleMap>
  ))
)

export default function AddNewUser({ open, toggleSidebar }) {
  const { Option } = Select
  const [Alluser, setAlluser] = useState([])

  const onFinish = (values) => {
    const data = {
      customer_name: values.customer_name,
      tel: values.tel,
      address: values.address,
      product_info: values.product_info,
      status: 'waite',
      member_id: values.member_id,
      lat: newLatLng[0].lat,
      long: newLatLng[0].lng
    }
    InsertProducts(data).then(() => toggleSidebar())
  }

  useEffect(() => {
    const getAllemp = () => {
      FetchAllMember().then((response) => {
        if (response) {
          console.log('response ==>', response)
          setAlluser(response)
        }
      })
    }
    getAllemp()
  }, [])

  return (
    <Modal
      title="Add Contact"
      visible={open}
      onCancel={toggleSidebar}
      footer={null}
      bodyStyle={{ padding: 24 }}
    >
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={[8, 0]}>
          <Col md={12} span={24}>
            <Form.Item
              name="customer_name"
              label="??????????????????????????????"
              rules={[{ required: true, message: 'This is required!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item
              name="tel"
              label="???????????????????????????????????????"
              rules={[{ required: true, message: 'This is required!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item
              name="address"
              label="???????????????????????????????????????"
              rules={[{ required: true, message: 'This is required!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item
              name="product_info"
              label="??????????????????????????????????????????????????????????????????"
              rules={[{ required: true, message: 'This is required!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <Form.Item
              name="member_id"
              label="?????????????????????????????????????????????"
              rules={[{ required: true, message: 'This is required!' }]}
            >
              <Select placeholder="----- ??????????????????????????? -----">
                <Option value="113252534536">fuseter</Option>
                <Option value="inactive">fuseter2</Option>
                <Option value="pending">fuseter3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={24} span={24}>
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKBdBAnDzrOkcfHq9InQFfYM7Inig-Zeg&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '400px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
            />
          </Col>

          <Divider />
          <Col span={24}>
            <Button type="primary" htmlType="submit" block>
              ????????????????????????????????????
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
