import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"banhkeo"} heading={"Bánh Kẹo Yêu Thích"}/>
      <HorizontalCardProduct category={"sua"} heading={"Sữa Phổ Biến"}/>

      <VerticalCardProduct category={"raucuqua"} heading={"Rau củ"}/>
      <VerticalCardProduct category={"thit"} heading={"Thịt"}/>
      <VerticalCardProduct category={"bia"} heading={"Bia,Đồ uống có cồn"}/>
      <VerticalCardProduct category={"traicay"} heading={"Trái Cây"}/>
      <VerticalCardProduct category={"giavi"} heading={"Gia Vị"}/>
      <VerticalCardProduct category={"nuocngot"} heading={"Nước Ngọt"}/>      
      <VerticalCardProduct category={"nuocgiat"} heading={"Nước Giặt"}/>
      <VerticalCardProduct category={"chamsoccanhan"} heading={"Chăm Sóc Cá Nhân"}/>
    </div>
  )
}

export default Home