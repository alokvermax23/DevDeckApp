import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../theme/colors';

type FilterMode = 'all' | 'commits' | 'problems';

const FILTERS: { key: FilterMode; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'commits', label: 'Commits' },
  { key: 'problems', label: 'Problems' },
];

export default function HeatmapCard({ 
  heatmapData = {},
  githubHeatmap = {},
  problemsHeatmap = {},
  totalContributions = 0,
  githubCommits = 0,
}: { 
  heatmapData?: Record<string, number>;
  githubHeatmap?: Record<string, number>;
  problemsHeatmap?: Record<string, number>;
  totalContributions?: number;
  githubCommits?: number;
}) {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<View>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  const activeData =
    filter === 'commits' ? githubHeatmap :
    filter === 'problems' ? problemsHeatmap :
    heatmapData;

  const activeTotal =
    filter === 'commits' ? githubCommits :
    filter === 'problems' ? totalContributions :
    totalContributions + githubCommits;

  const activeLabel =
    filter === 'commits' ? 'GitHub Commits' :
    filter === 'problems' ? 'Problems Solved' :
    'Total Contributions';

  const intensityColors = [
    '#2a2a2a', // 0
    'rgba(192, 193, 255, 0.2)', // 1
    'rgba(192, 193, 255, 0.4)', // 2
    'rgba(192, 193, 255, 0.7)', // 3
    colors.primary, // 4
  ];

  const monthsData = [];
  const today = new Date();
  
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
    
    let firstCol = Array(7).fill(null);
    for (let i = currentDayOfWeek; i < 7 && dayCounter <= m.days; i++) {
      firstCol[i] = `${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
      dayCounter++;
    }
    colsData.push(firstCol);

    while (m.days - dayCounter + 1 >= 7) {
      let col = [];
      for (let i = 0; i < 7; i++) {
        col.push(`${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`);
        dayCounter++;
      }
      colsData.push(col);
    }

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

    monthsData.push({ name: m.name, columns: colsData });
  }

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Contribution Activity</Text>
        {/* Dropdown trigger */}
        <TouchableOpacity
          ref={dropdownRef}
          style={styles.dropdownTrigger}
          activeOpacity={0.7}
          onPress={() => {
            dropdownRef.current?.measureInWindow((x, y, width, height) => {
              setDropdownPos({ top: y + height + 4, right: 0 });
              setDropdownOpen(true);
            });
          }}
        >
          <Text style={styles.dropdownTriggerText}>
            {FILTERS.find(f => f.key === filter)?.label}
          </Text>
          <Text style={styles.dropdownChevron}>▾</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="none"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={[styles.dropdownMenu, { top: dropdownPos.top }]}>
            {FILTERS.map(f => (
              <TouchableOpacity
                key={f.key}
                style={[styles.dropdownItem, filter === f.key && styles.dropdownItemActive]}
                onPress={() => { setFilter(f.key); setDropdownOpen(false); }}
                activeOpacity={0.7}
              >
                <Text style={[styles.dropdownItemText, filter === f.key && styles.dropdownItemTextActive]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

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
                      
                      const count = activeData[dateStr] || 0;
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
          <Text style={styles.totalContributions}>{activeTotal.toLocaleString()} {activeLabel}</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#262626',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Geist-Medium',
    color: colors.onSurface,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: colors.surfaceContainerHigh,
  },
  dropdownTriggerText: {
    fontSize: 11,
    fontFamily: 'JetBrainsMono-Medium',
    color: colors.onSurfaceVariant,
  },
  dropdownChevron: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 16,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
    minWidth: 110,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(192, 193, 255, 0.1)',
  },
  dropdownItemText: {
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Medium',
    color: colors.onSurfaceVariant,
  },
  dropdownItemTextActive: {
    color: colors.primary,
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
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scrollContent: {
    paddingBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  monthBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  monthColumns: {
    flexDirection: 'row',
    gap: 3,
  },
  monthLabel: {
    fontSize: 10,
    fontFamily: 'Geist-Medium',
    color: colors.onSurfaceVariant,
  },
  column: {
    flexDirection: 'column',
    gap: 3,
  },
  cell: {
    width: 10,
    height: 10,
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
    fontSize: 12,
    fontFamily: 'JetBrainsMono-Medium',
    color: colors.primary,
    marginBottom: 2,
  },
  timeframe: {
    fontSize: 11,
    fontFamily: 'JetBrainsMono-Regular',
    color: colors.onSurfaceVariant,
  },
});
