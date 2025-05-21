/**
 * Check if two date ranges overlap
 * @param {Date} start1 - Start date of first range
 * @param {Date} end1 - End date of first range
 * @param {Date} start2 - Start date of second range
 * @param {Date} end2 - End date of second range
 * @returns {boolean} - True if ranges overlap, false otherwise
 */
const isDateRangeOverlapping = (start1, end1, start2, end2) => {
    return (start1 <= end2 && end1 >= start2);
  };
  
  module.exports = {
    isDateRangeOverlapping
  };
  