import { useState } from 'react';
import {
LuUtensils,
LuCar,
LuShoppingBag,
LuReceipt,
LuFilm,
LuHeartPulse,
LuPencil,
} from 'react-icons/lu';

import { useFinance } from '../../context/FinanceContext';
import BudgetFormModal from './BudgetFormModal';

import './BudgetCategoryCards.css';

const categoryIcons = {
Food: LuUtensils,
Transport: LuCar,
Shopping: LuShoppingBag,
Bills: LuReceipt,
Entertainment: LuFilm,
Health: LuHeartPulse,
};

const categoryColors = {
Food: '#F97316',
Transport: '#06B6D4',
Shopping: '#7C5CFA',
Bills: '#F59E0B',
Entertainment: '#EC4899',
Health: '#10B981',
};

const formatCurrency = (amount) =>
`₹${amount.toLocaleString('en-IN')}`;

const BudgetCategoryCards = ({ selectedMonth }) => {
const {
  transactions,
  budgets,
} = useFinance();

const [isModalOpen, setIsModalOpen] =
useState(false);
const [selectedBudget, setSelectedBudget] =
useState(null);

const monthExpenses = transactions.filter(
(t) =>
t.type === 'expense' &&
t.date.startsWith(selectedMonth)
);

const categories = Object.entries(budgets).map(
([category, budget]) => {
const spent = monthExpenses
.filter((t) => t.category === category)
.reduce((sum, t) => sum + t.amount, 0);

  const remaining = budget - spent;

  const percentage =
    budget > 0
      ? Math.min(
          Math.round((spent / budget) * 100),
          100
        )
      : 0;

  let status = 'Under budget';

  if (spent > budget) {
    status = 'Over budget';
  } else if (percentage >= 85) {
    status = 'Near limit';
  }

  return {
    category,
    budget,
    spent,
    remaining,
    percentage,
    status,
  };
}

);

const openEditModal = (category, budget) => {
setSelectedBudget({ category, budget });
setIsModalOpen(true);
};

const handleSaveBudget = (newBudget) => {
updateBudget(
selectedBudget.category,
newBudget
);
setIsModalOpen(false);
setSelectedBudget(null);
};

return (
<> <div className='budget-categories'> <div className='budget-section-header'> <h3>Category budgets</h3> </div>

    <div className='budget-category-grid'>
      {categories.map((item) => {
        const Icon =
          categoryIcons[item.category];
        const color =
          categoryColors[item.category];

        return (
          <div
            key={item.category}
            className='budget-category-card'
          >
            <div className='budget-category-top'>
              <div className='budget-category-info'>
                <div
                  className='budget-category-icon'
                  style={{
                    background: `${color}20`,
                    color,
                  }}
                >
                  <Icon />
                </div>

                <div>
                  <h4>{item.category}</h4>
                  <p>
                    Monthly spending budget
                  </p>
                </div>
              </div>

              <div className='budget-category-actions'>
                <button
                  className='budget-edit-btn'
                  onClick={() =>
                    openEditModal(
                      item.category,
                      item.budget
                    )
                  }
                  title='Edit budget'
                >
                  <LuPencil />
                </button>

                <span
                  className={`budget-status ${item.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div className='budget-amounts'>
              <div>
                <span>Spent</span>
                <strong>
                  {formatCurrency(
                    item.spent
                  )}
                </strong>
              </div>

              <div>
                <span>Budget</span>
                <strong>
                  {formatCurrency(
                    item.budget
                  )}
                </strong>
              </div>
            </div>

            <div className='budget-progress'>
              <div className='budget-progress-track'>
                <div
                  className='budget-progress-fill'
                  style={{
                    width: `${item.percentage}%`,
                    background: color,
                  }}
                />
              </div>

              <div className='budget-progress-label'>
                <span>
                  {item.percentage}% used
                </span>

                <span>
                  {item.remaining >= 0
                    ? `${formatCurrency(
                        item.remaining
                      )} remaining`
                    : `${formatCurrency(
                        Math.abs(
                          item.remaining
                        )
                      )} over`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  <BudgetFormModal
    isOpen={isModalOpen}
    onClose={() => {
      setIsModalOpen(false);
      setSelectedBudget(null);
    }}
    category={selectedBudget?.category}
    currentBudget={selectedBudget?.budget}
  />
</>
);
};

export default BudgetCategoryCards;
