import { hashPassword, comparePasswords } from './helpers/auth.js';

async function testPasswordHashing() {
  try {
    const testPassword = 'testpassword123';
    console.log('Testing password:', testPassword);

    // Hash the password
    const hashedPassword = await hashPassword(testPassword);
    console.log('Hashed password:', hashedPassword);
    console.log('Hash length:', hashedPassword.length);

    // Compare the password
    const match = await comparePasswords(testPassword, hashedPassword);
    console.log('Password comparison result:', match);

    // Test with wrong password
    const wrongMatch = await comparePasswords('wrongpassword', hashedPassword);
    console.log('Wrong password comparison result:', wrongMatch);

    if (match && !wrongMatch) {
      console.log('✅ Password hashing and comparison is working correctly!');
    } else {
      console.log(
        '❌ Password hashing and comparison is NOT working correctly!'
      );
    }
  } catch (error) {
    console.error('Error testing password functions:', error);
  }
}

testPasswordHashing();
