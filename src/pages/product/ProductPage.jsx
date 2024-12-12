import React, { useEffect, useState } from "react";
import AddButton from "../../components/ui/addbutton/AddButton";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import Product from "../../components/product/Product";
import './ProductPage.css'

function Products() {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    // Função para pegar todos os produtos da API
    const pegarTodasAsProductsDaApi = async () => {
        try {
            const response = await axios.get("http://localhost:4444/products/",);
            setProducts(response.data.products);
        } catch (err) {
            console.error("Erro ao pegar os dados da API", err);
        }
    };

    // Função para criar um novo produto
    const createProduct = async (name, description, quantity) => {
        try {
            const response = await axios.post(
                "http://localhost:4444/products/create-product",
                { name, description, quantity },  // Dados do produto
                { withCredentials: true }  // Configuração do cookie
            );
            setProducts((prevProducts) => [...prevProducts, response.data.data]);
        } catch (err) {
            console.error("Erro ao criar o produto", err);
        }
    };


    // Função para deletar um produto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:4444/products/delete-product/${id}`, { withCredentials: true });
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (err) {
            console.error("Erro ao deletar o produto", err);
        }
    };

    // Função para editar um produto
    const editProduct = async (name, description, quantity, id) => {
        try {
            const response = await axios.put("http://localhost:4444/products/edit-product", {
                name,
                description,
                quantity,
                _id: id,
            },
                { withCredentials: true });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? response.data.updatedProduct : product
                )
            );
        } catch (err) {
            console.error("Erro ao editar o produto", err);
        }
    };

    useEffect(() => {
        pegarTodasAsProductsDaApi();
    }, []);

    const mudarModal = () => {
        setShowModal((state) => !state);
    };

    return (
        <div>
            <AddButton abrirOModal={mudarModal} texto="Adicionar um produto" />

            {showModal && (
                <Modal
                    createProduct={createProduct}
                    fecharOModal={mudarModal}
                />
            )}

            {editingProduct && (
                <Modal
                    createProduct={editProduct}
                    editingProduct={editingProduct}
                    fecharOModal={() => setEditingProduct(null)}
                />
            )}

            <div id="productslist">
                {products.map((product) => (
                    <Product
                        key={product._id} // Chave única
                        {...product}
                        deleteProduct={deleteProduct}
                        editProduct={editProduct}
                        setEditMode={(productData) => setEditingProduct(productData)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;
