import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      console.log(signedInUser)
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      toast.error(err.message)
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 px-4 py-12">
      <h1 className="text-center text-4xl">
        Welcome back!
      </h1>
      <p className="flex items-center justify-center gap-2 text-center text-2xl">
        New user? Go to
        <Button variant="outline" asChild>
          <Link to="/sign-up">Sign up</Link>
        </Button>
      </p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your username and password to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Sign In</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInForm;