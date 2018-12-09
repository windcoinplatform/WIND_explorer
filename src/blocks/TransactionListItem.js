import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../shared/DateTime';
import AddressRef from '../shared/AddressRef';
import CurrencyRef from '../shared/CurrencyRef';
import TransactionRef from '../shared/TransactionRef';
import TransactionArrow from '../shared/TransactionArrow';
import Currency from '../shared/Currency';

export const createListItem = (transaction) => {
    switch (transaction.type) {
        case 2:
        case 4:
            return <TransferTransactionListItem key={transaction.id} tx={transaction} />;

        case 3:
        case 5:
            return <IssueTransactionListItem key={transaction.id} tx={transaction} />;

        case 6:
            return <BurnTransactionListItem key={transaction.id} tx={transaction} />;

        case 7:
            return <ExchangeTransactionListItem key={transaction.id} tx={transaction} />;

        case 8:
            return <LeasingTransactionListItem key={transaction.id} tx={transaction} />;

        case 9:
            return <CancelLeasingTransactionListItem key={transaction.id} tx={transaction} />;

        case 10:
            return <AliasTransactionListItem key={transaction.id} tx={transaction} />;

        case 11:
            return <MassPaymentTransactionListItem key={transaction.id} tx={transaction} />;

        default:
            return null;
    }
};

class Line extends React.PureComponent {
    static propTypes = {
        wrap: PropTypes.bool,
        bold: PropTypes.bool
    };

    static defaultProps = {
        wrap: true,
        bold: false
    };

    render() {
        let className = 'line';
        if (!this.props.wrap)
            className += ' no-wrap';
        if (this.props.bold)
            className += ' bold';

        return <div className={className}>{this.props.children}</div>
    }
}

class IdAndTimestamp extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.instanceOf(DateTime).isRequired
    };

    render() {
        return (
            <td data-label="ID / Timestamp">
                <Line wrap={false}><TransactionRef txId={this.props.id}/></Line>
                <Line><label>{this.props.timestamp.toLongString()}</label></Line>
            </td>
        );
    }
}

class Subjects extends React.PureComponent {
    static propTypes = {
        type: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        recipient: PropTypes.string
    };

    render() {
        return (
            <td data-label="Sender / Recipient">
                <TransactionArrow type={this.props.type} />
                <Line wrap={false}><AddressRef address={this.props.sender} appearance="regular"/></Line>
                <Line wrap={false}>
                    {this.props.recipient && <AddressRef address={this.props.recipient} appearance="regular"/>}
                </Line>
            </td>
        );
    }
}

class AmountAndFee extends React.PureComponent {
    static propTypes = {
        amount: PropTypes.object,
        fee: PropTypes.object
    };

    render() {
        return (
            <td data-label="Amount / Fee">
                <Line>{this.props.amount.toString()}</Line>
                <Line><label>{this.props.fee.toString()}</label></Line>
            </td>
        );
    }
}

class JustFee extends React.PureComponent {
    static propTypes = {
        fee: PropTypes.object
    };

    render() {
        return (
            <td data-label="Fee">
                <Line>{this.props.fee.toString()}</Line>
                <Line />
            </td>
        );
    }
}

class TransferTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.amount.currency} /></Line>
                </td>
            </tr>
        );
    }
}

class ExchangeTransactionListItem extends React.PureComponent {
    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Seller / Buyer">
                    <div className="arrow exchange"></div>
                    <div className="line no-wrap"><AddressRef address={tx.sender} appearance="regular"/></div>
                    <div className="line no-wrap"><AddressRef address={tx.recipient} appearance="regular"/></div>
                </td>
                <td data-label="Amount / Total">
                    <div className="line">{tx.amount.toString()}</div>
                    <div className="line bold">{tx.total.toString()}</div>
                </td>
                <td data-label="Pair / Price">
                    <div className="line">
                        <CurrencyRef currency={tx.price.amountAsset}/> / <CurrencyRef currency={tx.price.priceAsset} />
                    </div>
                    <div className="line bold">{tx.price.toString()}</div>
                </td>
            </tr>
        );
    }
}

class LeasingTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
            </tr>
        );
    }
}

class CancelLeasingTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <JustFee fee={tx.fee} />
            </tr>
        );
    }
}

class IssueTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type} />
                    <Line wrap={false}><AddressRef address={tx.sender} appearance="regular"/></Line>
                    <Line wrap={false}>
                        <TransactionRef txId={tx.assetId}/>
                    </Line>
                </td>
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
                <td>
                    <Line bold={true}>{tx.name}</Line>
                </td>
            </tr>
        );
    }
}

class BurnTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.amount.currency} /></Line>
                </td>
            </tr>
        );
    }
}

class AliasTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <JustFee fee={tx.fee} />
                <td data-label="Price">
                    <Line bold={true}>{tx.alias}</Line>
                </td>
            </tr>
        );
    }
}

class MassPaymentTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type} />
                    <Line wrap={false}><AddressRef address={tx.sender} appearance="regular"/></Line>
                    <Line>{tx.transferCount}</Line>
                </td>
                <AmountAndFee amount={tx.totalAmount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.totalAmount.currency} /></Line>
                </td>
            </tr>
        );
    }
}