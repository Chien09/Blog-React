 
 function Footer(){
     const currentYear = new Date().getFullYear();

     return(
         <footer className="footer">
            <p>Copyright Krittidet Liu @ {currentYear}</p>
         </footer>
     );
 }

 export default Footer;

 