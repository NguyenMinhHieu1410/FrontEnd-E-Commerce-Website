import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm xử lý sự kiện cuộn trang
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn trang về đầu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Sử dụng useEffect để lắng nghe sự kiện cuộn trang
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.backToTopButton}>
          ↑
        </button>
      )}
    </div>
  );
};

const styles = {
  backToTopButton: {
    
      position: 'fixed',
      bottom: '40px', // Adjust this value to move the button lower
      right: '90px', // Adjust this value to move the button further to the left
      padding: '0', // Remove padding to ensure the button is perfectly round
      width: '50px', // Adjust this value to set the size of the button
      height: '50px', // Ensure this value matches the width for a round button
      fontSize: '24px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 1000,
      lineHeight: '50px', // Ensure this value matches the height for vertical centering
      textAlign: 'center'
  
  },
};

export default BackToTop;
