import React from 'react'
import NavbarSeller from './NavBarSeller'
import { Button } from 'antd'
import { HomeOutlined,SearchOutlined,UsergroupAddOutlined,RightOutlined } from '@ant-design/icons';
import home from '../images/home.png'
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const HomeSeller = ({user_id}) => {
    const navigate = useNavigate();
    console.log(user_id)
  return (
    <>
        <NavbarSeller user_id={user_id}/>
        <div class="header container m-5">
        <div class="row justify-content-start">
            <div class="content col-lg-5 col-md-6 col-12">
                <h1 className='typewrite fo'><HomeOutlined />Rentify </h1>
                <p className='typewrite po'>Where Renting Meets Simplicity</p> 
                <h5>Let the world know about your property and</h5> 
                <h5>find trusted buyers through Rentify! </h5> 
                <Button className='button' onClick={()=>navigate('/post-ad')} icon={<RightOutlined />} iconPosition="end">Post Ad</Button>
            </div>
            <div class="col-lg-4 col-md-6 col-12">
                <div class="header-img">
                    <img src={home} alt="Responsive image" />
                </div>
            </div>
        </div>
        
    </div>
    <div className='count '>
    <div class="container mt-3 mb-5 ">
    <div class="row">
    <div class="col mt-3 box-1">
    <div className='text-center'>
    <HomeOutlined className='mb-2' style={{fontSize:"30px"}}/>
    </div>
    <h5>Discover your perfect tenant today!</h5>
    <p>Begin your search for the perfect tenant today! With our extensive listings and user-friendly search tools, rent your home has never been easier. Start exploring now and let us help you find your ideal buyer.</p>
    </div>
    <div class="col  mt-3 box-4">
    <div className='text-center'>
    <SearchOutlined className='mb-2 text-center' style={{fontSize:"30px"}}/>
    </div>
    <h5>Find tenants on your need!</h5>
    <p>Embark on your journey to finding the ideal tenant that fits your every need. Whether you're having a cozy apartment in the heart of the city or a serene villa nestled in the countryside, we have a diverse range of buyers waiting to be discover. </p>
    </div>
    <div class="col mt-3 box-3">
    <div className='text-center'>
    <UsergroupAddOutlined className='mb-2' style={{fontSize:"30px"}}/>
    </div>
    <h5> Connect with the rental owners!</h5>
    <p>Unlock your ideal rental property by connecting directly with our trusted landlords! Don't delay – start browsing our listings and connecting with landlords today to find the ideal rental property that suits your lifestyle.</p>
    </div>
  </div>
</div>
</div>
    <Footer />
    </>
  )
}

export default HomeSeller