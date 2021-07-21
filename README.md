Database: MONGODB

RUN: npm run server

ENDPOINTS:

// WEBSITE OWNER

SIGNUP: http://localhost:8000/Osignup   //POST {email,password}
        http://localhost:8000/Odata   //GET

LOGIN: http://localhost:8000/login      //POST {email,password}

ADD PRODUCT: http://localhost:8000/product  //POST {pname,pprice,pquantity}
             http://localhost:8000/product  //GET
             
LOGOUT: http://localhost:8000/logout 
             
// CUSTOMER


SIGNUP: http://localhost:8000/Csignup   //POST {email,password}
        http://localhost:8000/Cdata   //GET

LOGIN: http://localhost:8000/clogin      //POST {email,password}

BROWSE PRODUCT: http://localhost:8000/browse //GET

ORDER PRODUCT: http://localhost:8000/order //POST {pname ..i.e enter product name}

LOGOUT: http://localhost:8000/Clogout
