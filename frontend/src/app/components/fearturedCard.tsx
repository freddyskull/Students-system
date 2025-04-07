import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FearturedCard as FearturedCardProps } from '../home'

export const FearturedCard = ({ title, subtitle, badgeText, contentLabel, contentValue }: FearturedCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between font-light text-sm">
          <span>{subtitle}</span>
          <span>
            <Badge variant='outline'>{badgeText}</Badge>
          </span>
        </div>
        <CardTitle className="font-bold text-xl uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{contentLabel}</p>
        <p className="text-slate-400">{contentValue}</p>
      </CardContent>
    </Card>
  )
}
