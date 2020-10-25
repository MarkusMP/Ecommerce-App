import React, { useContext, useState, useEffect, } from 'react'
import { auth, db } from '../firebase'
import {getLocalStorage, setLocalStorage} from '../hooks/UseLocalStorage'
const Context = React.createContext()

export function Con() {
    return useContext(Context)
}

export function ContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [products, setProducts] = useState([])
    const [productsCart, setProductsCart] = useState([])

    function logout() {
        return auth.signOut()
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function handleAddToCart(id) {
       if(currentUser) {
        db.collection('Products').doc(id).get().then((doc) => {
            if (doc.exists) {
                const item = {
                    ...doc.data(),
                    quantity: 1,
                }

                function ProductExist(id) {
                    return productsCart.some(function (el) {
                        return el.id === id;
                    });
                }

                const answer = ProductExist(id)

                if (!answer) {
                    setProductsCart(prevState => [...prevState, item])

                    db.collection('users').doc(currentUser.uid).collection('CartItems').doc(item.id).set({
                        ...doc.data(),
                        quantity: 1,
                    })
                } else {
                    alert('Item has already been added to cart')
                }
            }
        })
       } else {
           const item = products.find(product => {
               if(product.id === id) {
                   return product
               } else {
                   return null
               }
           })
     
           function ProductExist(id) {
            return productsCart.some(function (el) {
                return el.id === id;
            });
            
        }

        const answer = ProductExist(id)
           if(!answer) {
            setProductsCart([...productsCart, {...item, quantity: 1}])
           } else {
            alert('Item has already been added to cart')
           }
       }
    }

function handleDeleteCartItem(id) {
    if(currentUser) {
        db.collection('users').doc(currentUser.uid).collection('CartItems').doc(id).delete()
    } {
        const newItems = productsCart.filter(products => products.id !== id )  
        setProductsCart(newItems)
    }
}

function handleItemQuantity(quantity, id) {

    if(currentUser) {
        db.collection('users').doc(currentUser.uid).collection('CartItems').doc(id).update({
            quantity: parseInt(quantity)
        })
    } else {
        const newItems = productsCart.map(products => products.id === id ? {...products, quantity: parseInt(quantity)} : products)  
        setProductsCart(newItems)
    }

}


    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            const time = new Date()

            if (user) {
                const ref = db.collection('users').doc(user.uid)

                ref.get().then((doc) => {
                    if (doc.exists) {
                        setCurrentUser(doc.data())
                    } else {
                        ref.set({
                            email: user.email,
                            emailVerified: user.emailVerified,
                            uid: user.uid,
                            date: time
                        })
                        setCurrentUser(doc.data())
                    }
                })

                ref.collection('CartItems').get().then((querySnapshot) => {
                    const data = []
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data())
                    })
                    setProductsCart(data)
                })

            } else {
                setCurrentUser(null)
                setProductsCart(getLocalStorage('cartItems', []))
            }

        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        db.collection('Products').get().then((querySnapshot) => {
            const data = []
            querySnapshot.forEach(function (doc) {
                data.push(doc.data())
            });
            setProducts(data)
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    }, [])

    useEffect(() => {
if(currentUser === null) {
    setLocalStorage('cartItems', productsCart)
    console.log('1')
} 
}, [productsCart])


    const value = {
        currentUser,
        productsCart,
        logout,
        signup,
        login,
        handleAddToCart,
        handleDeleteCartItem,
        handleItemQuantity,
        products
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
