import "dotenv/config";

let secret=''
if (process.env.JWT_SECRET) {
  secret = process.env.JWT_SECRET;
  
}
export { 
     secret 
 };