import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

// Services
import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';


const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });
  const { setUser } = useContext(UserContext);

  const { username, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await authService.signUp({ username, email, password });
      setUser(user);
      navigate('/');
    } catch (err) {
      toast.error(err.message)
    }
  };

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <main className="flex justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your details to sign up </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className="space-y-2">
              <Label htmlFor='username'>Username</Label>
              <Input
                type='text'
                id='username'
                value={username}
                name='username'
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                value={email}
                name='email'
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                value={password}
                name='password'
                onChange={handleChange}
                required
              />
            </div>

            {/* Coinfirm Password */}
            <div className="space-y-2">
              <Label htmlFor='confirm'>Confirm Password</Label>
              <Input
                type='password'
                id='confirm'
                value={passwordConf}
                name='passwordConf'
                onChange={handleChange}
                required
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isFormInvalid()}>Sign Up</Button>
              <Button type="button" variant='outline' onClick={() => navigate('/')}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpForm;