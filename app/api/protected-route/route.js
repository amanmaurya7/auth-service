import { verify } from 'jsonwebtoken';

export async function GET(request) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1]; // Token ko header se nikaalo

    if (!token) {
        return new Response(JSON.stringify({ error: 'Token is required' }), { status: 403 });
    }

    try {
        // Tumhara token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3Mjc4ODMxNjgsImV4cCI6MTcyNzg4Njc2OH0.X-mXYr-jUf-GglDuopLAQ_VUk0QFwnvvDcg0cp42YWM';

        // Tumhara secret key
        const secretKey = '8ebf12c985e051a5f965779eba391df21433591a9138c7761d3a4fed6be185a7f5dc6ffe2af1da8612c098bcc165ac9ac4e426bf069b899394a22db271aee8f0'; // Yahan apna actual secret key daalna hoga
        const decoded = verify(token, secretKey); // Token ko verify karo
        
        return new Response(JSON.stringify({ message: 'Protected data accessed', userId: decoded.userId }), { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error); // Error ko console par print karo
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}
