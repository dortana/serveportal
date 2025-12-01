'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTranslations } from 'next-intl';

const VisitChart = () => {
  const t = useTranslations();
  const chartData = [
    { month: t('January'), desktop: 186, mobile: 80 },
    { month: t('February'), desktop: 305, mobile: 200 },
    { month: t('March'), desktop: 237, mobile: 120 },
    { month: t('April'), desktop: 73, mobile: 190 },
    { month: t('May'), desktop: 209, mobile: 130 },
    { month: t('June'), desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: t('Desktop'),
      color: 'var(--brand-light)',
    },
    mobile: {
      label: t('Mobile'),
      color: 'var(--brand-blue-light)',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className='min-h-[200px]'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default VisitChart;
