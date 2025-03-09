import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from './src/pages/Login'; // Make sure this is the correct path

describe('Login Component', () => {
    it('should log in successfully', async () => {
        render(
            <MemoryRouter>  {/* Wrap your component with MemoryRouter */}
                <Login />
            </MemoryRouter>
        );

        // Simulate user input and button click
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Test@1234' } });

        fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ระบบ/i }));


        // Add your assertions here
        // For example:
        // expect(screen.getByText('Welcome')).toBeInTheDocument();
    });
});
