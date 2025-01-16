


export function process(store, order) {
    const storeMap = new Map(store.map(item => [item.size, item.quantity]));
    const resultStats = new Map();
    const assignment = [];
    let mismatches = 0;
  
    for (const customer of order) {
      const { id, size } = customer;
      let assignedSize = null;
  
      if (size.length === 1) {
        // Заказ на один размер
        const [preferredSize] = size;
        if (storeMap.get(preferredSize) > 0) {
          assignedSize = preferredSize;
          storeMap.set(preferredSize, storeMap.get(preferredSize) - 1);
        }
      } else {
        // Заказ на два размера с приоритетом
        const [size1, size2] = size;
        const preferredSize = customer.masterSize === "s1" ? size1 : size2;
        const fallbackSize = customer.masterSize === "s1" ? size2 : size1;
  
        if (storeMap.get(preferredSize) > 0) {
          assignedSize = preferredSize;
          storeMap.set(preferredSize, storeMap.get(preferredSize) - 1);
        } else if (storeMap.get(fallbackSize) > 0) {
          assignedSize = fallbackSize;
          storeMap.set(fallbackSize, storeMap.get(fallbackSize) - 1);
          mismatches += 1;
        }
      }
  
      if (!assignedSize) {
        return false; // Склад не может обработать заказ
      }
  
      assignment.push({ id, size: assignedSize });
      resultStats.set(
        assignedSize,
        (resultStats.get(assignedSize) || 0) + 1
      );
    }
  
    const stats = Array.from(resultStats)
      .map(([size, quantity]) => ({ size, quantity }))
      .sort((a, b) => a.size - b.size);
  
    return { stats, assignment, mismatches };
  }
  