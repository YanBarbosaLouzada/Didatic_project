import React, { useEffect, useState } from "react";
import AddButton from "../../components/ui/addbutton/AddButton";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import Product from "../../components/product/Product";

function Products() {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const pegarTodasAsProductsDaApi = () => {
        axios
            .get("https://web-intermediary-frontend.onrender.com/api/products")
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => console.log("Erro ao pegar os dados da API", err));
    };

    const createProduct = async (name, description, quantity) => {
        await axios
            .post("https://web-intermediary-frontend.onrender.com/api/products/create-product", {
                name,
                description,
                quantity,
            })
            .then((res) => {
                setProducts([...products, res.data.data]);
            })
            .catch((err) => console.log("Erro ao criar o produto", err));
    };

    const deleteProduct = async (id) => {
        await axios
            .delete(`https://web-intermediary-frontend.onrender.com/api/products/${id}`)
            .then((res) => {
                setProducts(products.filter((n) => n._id !== id));
            })
            .catch((err) => console.log("Erro ao deletar o produto", err));
    };

    const editProduct = (name, description, quantity, id) => {
        axios
            .put(`https://web-intermediary-frontend.onrender.com/api/products`, {
                name,
                description,
                quantity,
                _id: id,
            })
            .then((res) => {
                let newUpdatedProducts = products.map((n) => {
                    if (n._id === id) {
                        return res.data.updatedProduct;
                    }
                    return n;
                });
                setProducts(newUpdatedProducts);
            })
            .catch((err) => console.log("Erro ao editar o produto", err));
    };

    useEffect(() => {
        pegarTodasAsProductsDaApi();
    }, []);

    const mudarModal = () => {
        setShowModal((state) => !state);
    };

    return (
        <div>
            <AddButton abrirOModal={mudarModal} />
            {showModal ? (
                <Modal createProduct={createProduct} fecharOModal={mudarModal} />
            ) : null}
            {editingProduct ? (
                <Modal
                    createProduct={editProduct}
                    editingProduct={editingProduct}
                    fecharOModal={() => setEditingProduct(null)}
                />
            ) : null}
            <div className="Productslist">
                {products.map((n) => (
                    <Product
                        key={n._id}
                        {...n}
                        deleteProduct={deleteProduct}
                        editProduct={editProduct}
                        setEditMode={(data) => setEditingProduct(data)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;
