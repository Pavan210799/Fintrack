import { useEffect, useState } from 'react';
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
    }
  }, [isOpen, currentBudget]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(amount);

    if (!amount || Number.isNaN(value) || value <= 0) {
      toast.error(
        'Please enter a valid budget amount'
      );
      return;
    }

    updateBudget(category, value);
    toast.success(
      `${category} budget updated successfully`
    );
    onClose();
  };

  return (
    <div className='budget-modal-overlay'>
      <div className='budget-modal'>
        <div className='budget-modal-header'>
          <div className='budget-modal-title'>
            <div className='budget-modal-icon'>
              <LuWallet />
            </div>
            <div>
              <h3>Edit budget</h3>
              <p>
                Update the monthly budget for{' '}
                {category}
              </p>
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
              <span className='budget-currency'>
                ₹
              </span>

              <input
                type='number'
                min='1'
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder='Enter budget amount'
              />
            </div>

            <small>
              Set the monthly spending limit for this
              category.
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
    </div>
  );
};

export default BudgetFormModal;