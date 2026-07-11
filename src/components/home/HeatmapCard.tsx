import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';

export default function HeatmapCard({ 
  heatmapData = {}, 
  totalContributions = 0 
}: { 
  heatmapData?: Record<string, number>;
  totalContributions?: number;
}) {
  const intensityColors = [
    '#2a2a2a', // 0
    'rgba(192, 193, 255, 0.2)', // 1
    'rgba(192, 193, 255, 0.4)', // 2
    'rgba(192, 193, 255, 0.7)', // 3
    colors.primary, // 4
  ];

  const monthsData = [];
  const today = new Date();
  
  // We want the last 12 months including this one.
  const past12Months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    past12Months.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      name: d.toLocaleString('default', { month: 'short' }),
      days: new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    });
  }

  let currentDayOfWeek = new Date(past12Months[0].year, past12Months[0].month, 1).getDay();

  for (const m of past12Months) {
    const colsData: (string | null)[][] = [];
    let dayCounter = 1;
    
    // First column
    let firstCol = Array(7).fill(null);
    for (let i = currentDayOfWeek; i < 7 && dayCounter <= m.days; i++) {
      firstCol[i] = `${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
      dayCounter++;
    }
    colsData.push(firstCol);

    // Full columns
    while (m.days - dayCounter + 1 >= 7) {
      let col = [];
      for (let i = 0; i < 7; i++) {
        col.push(`${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`);
        dayCounter++;
      }
      colsData.push(col);
    }

    // Last column (if any remaining)
    if (dayCounter <= m.days) {
      let lastCol = Array(7).fill(null);
      let remaining = m.days - dayCounter + 1;
      for (let i = 0; i < remaining; i++) {
        lastCol[i] = `${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
        dayCounter++;
      }
      colsData.push(lastCol);
      currentDayOfWeek = remaining;
    } else {
      currentDayOfWeek = 0;
    }

    monthsData.push({
      name: m.name,
      columns: colsData
    });
  }

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Contribution Activity</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        }}
      >
        <View style={styles.grid}>
          {monthsData.map((month, mIndex) => (
            <View key={mIndex} style={styles.monthBlock}>
              <View style={styles.monthColumns}>
                {month.columns.map((col, colIndex) => (
                  <View key={colIndex} style={styles.column}>
                    {col.map((dateStr, rowIndex) => {
                      if (!dateStr) {
                        return <View key={rowIndex} style={[styles.cell, { backgroundColor: 'transparent' }]} />;
                      }
                      
                      const count = heatmapData[dateStr] || 0;
                      let intensity = 0;
                      if (count > 8) intensity = 4;
                      else if (count > 4) intensity = 3;
                      else if (count > 1) intensity = 2;
                      else if (count > 0) intensity = 1;

                      return (
                        <View
                          key={rowIndex}
                          style={[styles.cell, { backgroundColor: intensityColors[intensity] }]}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
              <Text style={styles.monthLabel}>{month.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          <Text style={styles.legendText}>Less</Text>
          {intensityColors.map((color, index) => (
            <View key={index} style={[styles.legendDot, { backgroundColor: color }]} />
          ))}
          <Text style={styles.legendText}>More</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalContributions}>{totalContributions.toLocaleString()} Total Contributions</Text>
          <Text style={styles.timeframe}>Last 365 days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#262626',
    marginTop: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Geist-Medium',
    color: colors.onSurface,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scrollContent: {
    paddingBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  monthBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  monthColumns: {
    flexDirection: 'row',
    gap: 4,
  },
  monthLabel: {
    fontSize: 11,
    fontFamily: 'Geist-Medium',
    color: colors.onSurfaceVariant,
  },
  column: {
    flexDirection: 'column',
    gap: 4,
  },
  cell: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  totalContributions: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Medium',
    color: colors.primary,
    marginBottom: 4,
  },
  timeframe: {
    fontSize: 14,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
  },
});
