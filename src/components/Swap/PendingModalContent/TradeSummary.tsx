import { useTheme } from '@mui/material'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import Row from 'components/Row'
import { LabelSmall } from 'components/Text'
import { ArrowRight } from 'react-feather'
import { InterfaceTrade } from 'state/routing/types'

export function TradeSummary({ trade }: { trade: Pick<InterfaceTrade, 'inputAmount' | 'outputAmount'> }) {
  const theme = useTheme()
  return (
    <Row gap="sm" justify="center" align="center">
      <CurrencyLogo currency={trade.inputAmount.currency} size="16px" />
      <LabelSmall color="textPrimary">
        {`${trade.inputAmount.value} ${trade.inputAmount.currency.symbol}`}{/* {formatCurrencyAmount(trade.inputAmount, NumberType.SwapTradeAmount)} {trade.inputAmount.currency.symbol} */}
      </LabelSmall>
      <ArrowRight color={theme.palette.custom.textTertiary} size="12px" />
      <CurrencyLogo currency={trade.outputAmount.currency} size="16px" />
      <LabelSmall color="textPrimary">
       {`${trade.outputAmount.value} ${trade.outputAmount.currency.symbol}`} {/* {formatCurrencyAmount(trade.outputAmount, NumberType.SwapTradeAmount)} {trade.outputAmount.currency.symbol} */}
      </LabelSmall>
    </Row>
  )
}