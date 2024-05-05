import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Container, Form, FormLabel, Table } from 'react-bootstrap';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import IconButton from './components/IconButton';
import JSConfetti from 'js-confetti'


const shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "CarrefourSA",
  },
  {
    id: 3,
    name: "Özdilek",
  },
  {
    id: 4,
    name: "Trendyol",
  },
  {
    id: 5,
    name: "Amazon",
  },
];

const categories = [
  {
    id: 1,
    name: "Oyuncak",
  },
  {
    id: 2,
    name: "Elektronik",
  },
  {
    id: 3,
    name: "Şarküteri",
  },
  {
    id: 4,
    name: "Bakliyat",
  },
  {
    id: 5,
    name: "Fırın",
  },
];

function App() {

 const[products, setProducts]=useState([])
 const[productName, setProductName]=useState("")
 const[shopsName, setShopsName]=useState("")
 const[categoryName, setCategoryName]=useState("")

 const addNewProduct= ()=>{
  const newProduct ={
    id:nanoid(),
    name:productName,
    shop:shopsName,
    category:categoryName,
 }
 setProducts([...products, newProduct])
 setProductName("")
 }

 const handlePruductTrClick = (id) => {
  const updatedProducts = products.map((product) =>
    product.id === id ? { ...product, isBought: true } : product
  );
  if(updatedProducts.every((receipt)=> !!receipt.isBought)){
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti()
  alert("Alışveriş tamamlandı")
}
  setProducts(updatedProducts);
};


  return (
    <>
    <Container className='mt-5'>
    <h1 className='text-center mb-5'>Alışveriş Listesi</h1>
     <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <FormLabel >Ürün ekleyiniz:</FormLabel>
        <Form.Control
        value={productName}
        onChange={(e)=>{setProductName(e.target.value)}}
         type="text" placeholder='Lütfen bir ürün ismi giriniz'  />
      </Form.Group>
      <FormLabel>Market seçiniz:</FormLabel>
      <Form.Select
      value={shopsName}
      onChange={(e)=>{setShopsName(e.target.value)}}
       aria-label="Floating label select example">
        {shops.map((shop) => {
        return  <option key={shop.id} value={shop.id}>{shop.name}</option>
        })}
      </Form.Select>
      <FormLabel>Kategori seçiniz:</FormLabel>
      <Form.Select
      value={categoryName}
      onChange={(e)=>{setCategoryName(e.target.value)}}
       aria-label="Floating label select example">
        {categories.map((category)=>{
        return  <option key={category.id} value={category.id}>{category.name}</option>
        })}
      </Form.Select>
      <div className='text-center mt-3'>
      <Button onClick={addNewProduct}>Ürünü Ekle</Button>
      </div>
    </Form>
    <Table className='mt-5' striped bordered hover>
      <thead>
        <tr>
          <th>Product Code-ID</th>
          <th>Name</th>
          <th>Shop</th>
          <th>Category</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
          {products.map(product=>(
            <tr 
            className={product.isBought ? "is-bought": ""}
            onClick={() => handlePruductTrClick(product.id)}
            key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{shops.find(shop=>shop.id==product.shop).name}</td>
            <td>{categories.find(category=>category.id == product.category).name}</td>
            <td width={25} className='text-center'><IconButton
              deleteClick={()=>{
                setProducts(products.filter((productFilter=>
                  productFilter.id !== product.id
                )));
              }}
            /></td>
            </tr>
          ))}   
      </tbody>
    </Table>
    </Container>
    </>
  )
}

export default App
