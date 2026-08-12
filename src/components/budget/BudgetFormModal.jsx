import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LuX, LuWallet } from 'react-icons/lu';
import { toast } from 'react-toastify';

import { useFinance } from '../../context/FinanceContext';

import './BudgetFormModal.css';

const BudgetFormModal = ({
  isOpen,
  onClose,
  category,
  currentBudget,
}) => {
  const { updateBudget } = useFinance();

  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount(String(currentBudget || ''));
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, currentBudget]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(amount);

    if (!amount || Number.isNaN(value) || value <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    updateBudget(category, value);
    toast.success(`${category} budget updated successfully`);
    onClose();
  };

  return createPortal(
    <div className='budget-modal-overlay' onClick={onClose}>
      <div
        className='budget-modal'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='budget-modal-header'>
          <div className='budget-modal-title'>
            <div className='budget-modal-icon'>
              <LuWallet />
            </div>

            <div>
              <h3>Edit budget</h3>
              <p>Update the monthly budget for {category}</p>
            </div>
          </div>

          <button
            className='budget-modal-close'
            onClick={onClose}
          >
            <LuX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='budget-form-group'>
            <label>Category</label>

            <div className='budget-readonly-field'>
              {category}
            </div>
          </div>

          <div className='budget-form-group'>
            <label>Monthly budget</label>

            <div className='budget-input-wrapper'>
              <span className='budget-currency'>₹</span>

              <input
                type='number'
                min='1'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter budget amount'
                autoFocus
              />
            </div>

            <small>
              Set the monthly spending limit for this category.
            </small>
          </div>

          <div className='budget-modal-actions'>
            <button
              type='button'
              className='budget-cancel-btn'
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='budget-save-btn'
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default BudgetFormModal;