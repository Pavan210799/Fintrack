import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  LuLogOut,
  LuPencil,
  LuSave,
  LuX,
  LuCreditCard,
  LuTrash2,
} from 'react-icons/lu';
import { toast } from 'react-toastify';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

import ProfileHeader from '../../components/profile/ProfileHeader';
import PageTransition from '../../components/common/PageTransition';

import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { openSidebar } = useOutletContext();

  const { theme, toggleTheme } = useTheme();
  const { user, logout, updateProfile } = useAuth();

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  const [cardData, setCardData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || '',
        city: user.city || '',
        state: user.state || '',
        occupation: user.occupation || '',
        incomeRange: user.incomeRange || '',
        currency: user.currency || 'INR',
      });

      setCardData({
        cardHolder:
          user.card?.cardHolder ||
          user.displayName ||
          `${user.firstName || ''} ${user.lastName || ''}`,
        cardNumber: user.card?.cardNumber || '',
        expiry: user.card?.expiry || '',
        cvv: user.card?.cvv || '',
      });
    }
  }, [user]);

  const avatarLetter = (formData.firstName?.charAt(0) || 'U').toUpperCase();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = updateProfile({
        avatar: reader.result,
      });

      if (result.success) {
        toast.success('Profile photo updated');
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (name === 'expiry') {
      value = value
        .replace(/\D/g, '')
        .slice(0, 4);

      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }

    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const result = updateProfile(formData);

    if (result.success) {
      toast.success(result.message);
      setIsEditing(false);
    }
  };

  const handleSaveCard = () => {
    if (
      !cardData.cardHolder ||
      !cardData.cardNumber ||
      !cardData.expiry ||
      !cardData.cvv
    ) {
      toast.error('Please fill all card details');
      return;
    }

    const result = updateProfile({
      card: cardData,
    });

    if (result.success) {
      toast.success('Card saved successfully');
      setShowCardModal(false);
    }
  };

  const handleDeleteCard = () => {
    const result = updateProfile({
      card: null,
    });

    if (result.success) {
      setCardData({
        cardHolder:
          formData.displayName ||
          `${formData.firstName} ${formData.lastName}`,
        cardNumber: '',
        expiry: '',
        cvv: '',
      });

      toast.success('Card removed successfully');
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || '',
        city: user.city || '',
        state: user.state || '',
        occupation: user.occupation || '',
        incomeRange: user.incomeRange || '',
        currency: user.currency || 'INR',
      });
    }

    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const hasCard = user?.card;

  return (
    <PageTransition>
      <div className='profile-page'>
        <ProfileHeader
          theme={theme}
          toggleTheme={toggleTheme}
          openSidebar={openSidebar}
        />

        <div className='profile-container'>
          <div className='profile-card'>
            <div className='profile-top'>
                <div
                    className='profile-avatar clickable'
                    onClick={() => fileInputRef.current?.click()}
                    title='Change profile photo'
                >
                    {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt='Profile'
                        className='profile-avatar-image'
                    />
                    ) : (
                    <span>{avatarLetter}</span>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleAvatarUpload}
                />

                <div className='profile-user-info'>
                    <h2>
                    {formData.displayName ||
                        `${formData.firstName} ${formData.lastName}`}
                    </h2>
                    <p>{formData.email}</p>
                </div>
                </div>

            <div className='profile-actions'>
              {isEditing ? (
                <>
                  <button
                    className='profile-btn primary'
                    onClick={handleSave}
                  >
                    <LuSave />
                    Save changes
                  </button>

                  <button
                    className='profile-btn'
                    onClick={handleCancel}
                  >
                    <LuX />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className='profile-btn primary'
                  onClick={() => setIsEditing(true)}
                >
                  <LuPencil />
                  Edit profile
                </button>
              )}

              <button
                className='profile-btn danger'
                onClick={handleLogout}
              >
                <LuLogOut />
                Logout
              </button>
            </div>
          </div>

          <div className='profile-details-card'>
            <div className='section-header'>
              <h3>Personal information</h3>
              <p>Your account details and profile information.</p>
            </div>

            <div className='profile-details-grid'>
              {[
                ['First name', 'firstName'],
                ['Last name', 'lastName'],
                ['Display name', 'displayName'],
                ['Email', 'email'],
                ['Phone', 'phone'],
                ['Date of birth', 'dob'],
                ['Gender', 'gender'],
                ['City', 'city'],
                ['State', 'state'],
                ['Occupation', 'occupation'],
                ['Income range', 'incomeRange'],
                ['Currency', 'currency'],
              ].map(([label, key]) => (
                <div
                  key={key}
                  className='detail-item'
                >
                  <span>{label}</span>

                  {isEditing ? (
                    <input
                      type={key === 'dob' ? 'date' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <strong>{formData[key] || '-'}</strong>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='profile-details-card'>
            <div className='section-header section-header-row'>
              <div>
                <h3>Payment card</h3>
                <p>Add and manage your payment methods.</p>
              </div>

              <button
                className='profile-btn primary add-card-btn'
                onClick={() => setShowCardModal(true)}
              >
                <LuCreditCard />
                {hasCard ? 'Edit card' : 'Add card'}
              </button>
            </div>

            <div className='card-placeholder'>
              {hasCard ? (
                <div>
                  <div className='saved-card'>
                    <div className='card-chip'></div>

                    <div className='card-number'>
                      {user.card.cardNumber}
                    </div>

                    <div className='card-footer'>
                      <div>
                        <span>Card holder</span>
                        <strong>{user.card.cardHolder}</strong>
                      </div>

                      <div>
                        <span>Expires</span>
                        <strong>{user.card.expiry}</strong>
                      </div>
                    </div>
                  </div>

                  <div className='card-actions'>
                    <button
                      className='card-action-btn'
                      onClick={() => setShowCardModal(true)}
                    >
                      Edit
                    </button>

                    <button
                      className='card-action-btn delete'
                      onClick={handleDeleteCard}
                    >
                      <LuTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className='card-skeleton'>
                  <div className='card-chip'></div>

                  <div className='card-number'>
                    •••• •••• •••• ••••
                  </div>

                  <div className='card-footer'>
                    <div>
                      <span>Card holder</span>
                      <strong>
                        {formData.displayName || 'Your Name'}
                      </strong>
                    </div>

                    <div>
                      <span>Expires</span>
                      <strong>MM/YY</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showCardModal && (
          <div className='card-modal-overlay'>
            <div className='card-modal'>
              <h3>
                {hasCard ? 'Edit card' : 'Add new card'}
              </h3>

              <p>
                Your card information is stored securely in
                local storage for this demo.
              </p>

              <div className='card-preview'>
                <div className='saved-card'>
                  <div className='card-chip'></div>

                  <div className='card-number'>
                    {cardData.cardNumber ||
                      '•••• •••• •••• ••••'}
                  </div>

                  <div className='card-footer'>
                    <div>
                      <span>Card holder</span>
                      <strong>
                        {cardData.cardHolder ||
                          'Your Name'}
                      </strong>
                    </div>

                    <div>
                      <span>Expires</span>
                      <strong>
                        {cardData.expiry || 'MM/YY'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className='card-form'>
                <input
                  type='text'
                  name='cardHolder'
                  placeholder='Card holder name'
                  value={cardData.cardHolder}
                  onChange={handleCardChange}
                />

                <input
                  type='text'
                  name='cardNumber'
                  placeholder='1234 5678 9012 3456'
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                />

                <div className='card-form-row'>
                  <input
                    type='text'
                    name='expiry'
                    placeholder='MM/YY'
                    value={cardData.expiry}
                    onChange={handleCardChange}
                  />

                  <input
                    type='password'
                    name='cvv'
                    placeholder='CVV'
                    value={cardData.cvv}
                    onChange={handleCardChange}
                  />
                </div>

                <div className='card-modal-actions'>
                  <button
                    className='card-cancel-btn'
                    onClick={() => setShowCardModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className='profile-btn primary'
                    onClick={handleSaveCard}
                  >
                    Save card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ProfilePage;