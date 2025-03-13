import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register';

test('ผู้ใช้สามารถสมัครสมาชิกได้สำเร็จ', async () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/อีเมล:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/ยืนยันรหัสผ่าน:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/สมัครสมาชิก/i));

    expect(await screen.findByText(/สมัครสมาชิกสำเร็จ/)).toBeInTheDocument();
});
