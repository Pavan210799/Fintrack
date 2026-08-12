import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/images/logo/logo.png';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const { theme } = useTheme();

  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    occupation: '',
    incomeRange: '',
    currency: 'INR',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error('Please enter email and password');
      return;
    }

    const result = login(loginData.email, loginData.password);

    if (result.success) {
      toast.success(result.message);
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !signupData.firstName.trim() ||
      !signupData.lastName.trim() ||
      !signupData.email.trim() ||
      !signupData.password.trim()
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const result = signup({
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      displayName:
        signupData.displayName ||
        `${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      phone: signupData.phone,
      dob: signupData.dob,
      gender: signupData.gender,
      city: signupData.city,
      state: signupData.state,
      occupation: signupData.occupation,
      incomeRange: signupData.incomeRange,
      currency: signupData.currency,
      password: signupData.password,
    });

    if (result.success) {
      toast.success(result.message);

      setSignupData({
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        city: '',
        state: '',
        occupation: '',
        incomeRange: '',
        currency: 'INR',
        password: '',
        confirmPassword: '',
      });

      setIsLogin(true);
    } else {
      toast.error(result.message);
    }
  };

  const formVariants = {
    initial: { opacity: 0, x: isLogin ? -30 : 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 30 : -30 },
  };

  return (
    <div className={`auth-page ${theme === 'dark' ? 'dark' : ''}`}>
      <div className='auth-background'>
        <motion.div
          className='orb orb-1'
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='orb orb-2'
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='orb orb-3'
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {[...Array(18)].map((_, index) => (
          <motion.span
            key={index}
            className='particle'
            style={{
              left: `${(index * 13) % 100}%`,
              top: `${(index * 17) % 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 6 + (index % 5),
              repeat: Infinity,
              delay: index * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className='grid-pattern' />
      </div>

      <motion.div
        className='auth-card'
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.05, ease: 'easeOut' }}
      >
        <div className='auth-header'>
            <div className='auth-brand'>
                <img
                src={logo}
                alt='FinTrack Logo'
                className='auth-logo'
                />
                <h1>FinTrack</h1>
            </div>
            <p>Smart personal finance management for everyday life.</p>
        </div>

        <div className='auth-tabs'>
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Sign in
          </button>

          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Create account
          </button>
        </div>

        <AnimatePresence mode='wait'>
          {isLogin ? (
            <motion.form
              key='login'
              className='auth-form'
              onSubmit={handleLogin}
              variants={formVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.35 }}
            >
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder='Enter your email'
                />
              </div>

              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder='Enter your password'
                />
              </div>

              <button type='submit' className='auth-button'>
                Sign in
              </button>

              <p className='auth-switch'>
                Don't have an account?
                <button
                  type='button'
                  onClick={() => setIsLogin(false)}
                >
                  Create account
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key='signup'
              className='auth-form'
              onSubmit={handleSignup}
              variants={formVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.35 }}
            >
              <div className='form-row'>
                <div className='form-group'>
                  <label>First name *</label>
                  <input
                    type='text'
                    name='firstName'
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder=''
                  />
                </div>

                <div className='form-group'>
                  <label>Last name *</label>
                  <input
                    type='text'
                    name='lastName'
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder=''
                  />
                </div>
              </div>

              <div className='form-group'>
                <label>Email *</label>
                <input
                  type='email'
                  name='email'
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder='Enter your email'
                />
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label>Phone</label>
                  <input
                    type='tel'
                    name='phone'
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    placeholder=''
                  />
                </div>

                <div className='form-group'>
                  <label>Date of birth</label>
                  <input
                    type='date'
                    name='dob'
                    value={signupData.dob}
                    onChange={handleSignupChange}
                  />
                </div>
              </div>

              <div className='form-row'>
                <div className='form-group'>
                  <label>City</label>
                  <input
                    type='text'
                    name='city'
                    value={signupData.city}
                    onChange={handleSignupChange}
                    placeholder=''
                  />
                </div>

                <div className='form-group'>
                  <label>State</label>
                  <input
                    type='text'
                    name='state'
                    value={signupData.state}
                    onChange={handleSignupChange}
                    placeholder=''
                  />
                </div>
              </div>

              <div className='form-group'>
                <label>Occupation</label>
                <input
                  type='text'
                  name='occupation'
                  value={signupData.occupation}
                  onChange={handleSignupChange}
                  placeholder=''
                />
              </div>

              <div className='form-group'>
                <label>Password *</label>
                <input
                  type='password'
                  name='password'
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder='Create a password'
                />
              </div>

              <div className='form-group'>
                <label>Confirm password *</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder='Confirm your password'
                />
              </div>

              <button type='submit' className='auth-button'>
                Create account
              </button>

              <p className='auth-switch'>
                Already have an account?
                <button
                  type='button'
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;