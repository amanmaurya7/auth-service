const { hash } = require('bcryptjs');

const plainPassword = 'aman123'; // Your original password
const hashPassword = async () => {
    const hashedPassword = await hash(plainPassword, 10); // 10 is the salt rounds
    console.log(hashedPassword); // Output the hashed password
};

hashPassword();
