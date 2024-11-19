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
            .get("https://web-intermediary-backend.onrender.com/products")
            .then((res) => {
                // console.log(res)
                // console.log(res.data)
                setProducts(res.data.products);
            })
            .catch((err) => console.log("erro ao pegar os dados da api", err));
    };
    const createProduct = async (name, description, quantity) => {
        await axios
            .post("https://web-intermediary-backend.onrender.com/products/create-product", {
                name,
                description,
                quantity,
            })
            .then((res) => {
                // console.log(res)
                // console.log(res.data)

                setProducts([...products, res.data.data]);
                // pegarTodasAsProductsDaApi()
            })
            .catch((err) => console.log("erro ao pegar os dados da api", err));
    };
    const deleteProduct = async (id) => {
        await axios
            .delete(
                `https://web-intermediary-backend.onrender.com/products/delete-product/${id}`
            )
            .then((res) => {
                // console.log(res)
                // console.log(res.data)
                setProducts(products.filter((n) => n._id !== id));
                // pegarTodasAsProductsDaApi()
            })
            .catch((err) => console.log("erro ao pegar os dados da api", err));
    };

    const editProduct = (name, description, quantity, id) => {
        axios
            .put(`https://web-intermediary-backend.onrender.com/products/edit-product`, {
                name,
                description,
                quantity,
                _id: id,
            })
            .then((res) => {
                // console.log(res)
                // console.log(res.data)
                let newUpdatedProducts = products.map((n) => {
                    if (n._id === id) {
                        return res.data.updatedProduct;
                    }
                    return n;
                });
                setProducts(newUpdatedProducts);
            })
            .catch((err) => console.log("erro ao pegar os dados da api", err));
    };

    useEffect(() => {
        pegarTodasAsProductsDaApi();
    }, []);
    const mudarModal = () => {
        setShowModal((state) => !state);
    };

    return (
        <div>
            <AddButton abrirOModal={mudarModal} texto="adicionar um produtudo"/>

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