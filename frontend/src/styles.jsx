import React from 'react';
import styled from 'styled-components';


Body = styled.body`
  minHeight: '100vh';
  backgroundColor: darkMode ? '#111827' : '#f9fafb';
  color: darkMode ? '#f9fafb' : '#111827';
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif';
  lineHeight: '1.5';
  transition: 'all 0.3s ease-in-out'
`;
import styled, { css, keyframes } from "styled-components";

const dark = css`
  background-color: #1f2937;
  color: #f9fafb;
`;
const light = css`
  background-color: #ffffff;
  color: #111827;
`;

// Common animations
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/* ===================== Header ===================== */
export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ThemeToggle = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
  transition: background-color 0.2s ease-in-out;
`;

export const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

/* ===================== Navigation ===================== */
export const Navigation = styled.nav`
  position: sticky;
  top: 4rem;
  z-index: 40;
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
`;

export const NavContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const TabList = styled.div`
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  white-space: nowrap;
  font-weight: 500;
  font-size: 0.875rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  color: ${({ active, darkMode }) =>
    active ? "#3b82f6" : darkMode ? "#9ca3af" : "#6b7280"};

  border-bottom: 2px solid ${({ active }) => (active ? "#3b82f6" : "transparent")};
`;

/* ===================== Cards ===================== */
export const Card = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

/* ===================== Buttons ===================== */
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: all 0.2s ease-in-out;

  ${({ variant, darkMode }) => {
    switch (variant) {
      case "primary":
        return `background-color: #3b82f6; color: white;`;
      case "secondary":
        return `
          background-color: transparent;
          color: ${darkMode ? "#d1d5db" : "#6b7280"};
          border: 2px solid ${darkMode ? "#374151" : "#e5e7eb"};
        `;
      case "success":
        return `background-color: #10b981; color: white;`;
      default:
        return `
          background-color: ${darkMode ? "#374151" : "#e5e7eb"};
          color: ${darkMode ? "#d1d5db" : "#6b7280"};
        `;
    }
  }}
`;

/* ===================== Loading ===================== */
export const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 2px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

export const LoadingText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const LoadingSubtext = styled.p`
  font-size: 0.875rem;
  margin: 0;
  color: #9ca3af;
`;
/* ===================== Upload Area ===================== */
export const UploadArea = styled.div`
  border: 2px dashed ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  background-color: ${({ darkMode }) => (darkMode ? "#111827" : "#f9fafb")};
  transition: border-color 0.2s ease-in-out;
`;

export const UploadIcon = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#6b7280")};
`;

export const UploadTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const UploadSubtitle = styled.p`
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

/* ===================== Grid Layouts ===================== */
export const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

export const NutritionGridLarge = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
`;

export const NutritionItem = styled.div`
  text-align: center;
`;

export const NutritionValue = styled.p`
  font-weight: 500;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const NutritionLabel = styled.p`
  font-size: 0.75rem;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

export const NutritionInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  text-align: center;
  font-size: 0.875rem;
  width: 100%;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

/* ===================== Total Nutrition ===================== */
export const TotalNutrition = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ darkMode }) =>
    darkMode ? "#1e3a8a20" : "#3b82f620"};
  border-left: 4px solid #3b82f6;
`;

export const TotalTitle = styled.p`
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const TotalValue = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  color: #3b82f6;
`;

/* ===================== Actions and Buttons Containers ===================== */
export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

/* ===================== Progress Bar ===================== */
export const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ProgressLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const ProgressValue = styled.span`
  font-size: 0.875rem;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 0.75rem;
  background-color: ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background: ${({ color }) => color};
  width: ${({ percentage }) => `${Math.min(percentage, 100)}%`};
  transition: width 0.3s ease-in-out;
`;

export const ProgressPercentage = styled.div`
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.25rem;
  color: ${({ complete, darkMode }) =>
    complete ? "#10b981" : darkMode ? "#9ca3af" : "#9ca3af"};
`;

/* ===================== Form Styles ===================== */
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
  font-size: 0.875rem;
`;

/* ===================== Search Input ===================== */
export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  background-color: ${({ darkMode }) => (darkMode ? "#1f2937" : "#ffffff")};
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
  font-size: 0.875rem;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

/* ===================== Food Grid ===================== */
export const FoodGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const FoodCard = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  background-color: ${({ darkMode }) => (darkMode ? "#111827" : "#f9fafb")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const FoodCardTitle = styled.p`
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const FoodCardNutrition = styled.div`
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

/* ===================== Meal History ===================== */
export const MealHistoryCard = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  background-color: ${({ darkMode }) => (darkMode ? "#111827" : "#f9fafb")};
  margin-bottom: 1rem;
`;

export const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MealInfo = styled.div`
  flex: 1;
`;

export const MealTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const MealName = styled.h3`
  font-weight: 500;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const MealTime = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${({ darkMode }) => (darkMode ? "#374151" : "#e5e7eb")};
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const MealItems = styled.p`
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
  color: ${({ darkMode }) => (darkMode ? "#d1d5db" : "#6b7280")};
`;

export const MealDate = styled.p`
  font-size: 0.75rem;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

export const MealNutrition = styled.div`
  text-align: right;
  margin-left: 1rem;
`;

export const MealCalories = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#f9fafb" : "#111827")};
`;

export const MealCaloriesLabel = styled.p`
  font-size: 0.75rem;
  margin: 0;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

export const MealMacros = styled.p`
  font-size: 0.75rem;
  margin: 0.25rem 0 0 0;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

/* ===================== Utility Styles ===================== */
export const GridLayout = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const Spacer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const DateInfo = styled.span`
  font-size: 0.875rem;
  color: ${({ darkMode }) => (darkMode ? "#9ca3af" : "#9ca3af")};
`;

export const Hidden = styled.div`
  display: none;
`;