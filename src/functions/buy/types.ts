import React, { ReactNode } from "react";
import { Horizon } from "@stellar/stellar-sdk";
import BigNumber from "bignumber.js";

declare global {
  interface Window {
    _env_: {
      AMPLITUDE_API_KEY: string;
      SENTRY_API_KEY: string;
      HORIZON_PASSPHRASE?: string;
      HORIZON_URL?: string;
      WALLET_BACKEND_ENDPOINT?: string;
      CLIENT_DOMAIN?: string;
    };
  }
}

export const XLM_NATIVE_ASSET = "XLM:native";

export enum SearchParams {
  SECRET_KEY = "secretKey",
  UNTRUSTED_ASSETS = "untrustedAssets",
  ASSET_OVERRIDES = "assetOverrides",
  CLAIMABLE_BALANCE_SUPPORTED = "claimableBalanceSupported",
}

export enum AssetCategory {
  TRUSTED = "trusted",
  UNTRUSTED = "untrusted",
}

export enum TomlFields {
  ACCOUNTS = "ACCOUNTS",
  ANCHOR_QUOTE_SERVER = "ANCHOR_QUOTE_SERVER",
  AUTH_SERVER = "AUTH_SERVER",
  DIRECT_PAYMENT_SERVER = "DIRECT_PAYMENT_SERVER",
  FEDERATION_SERVER = "FEDERATION_SERVER",
  HORIZON_URL = "HORIZON_URL",
  KYC_SERVER = "KYC_SERVER",
  NETWORK_PASSPHRASE = "NETWORK_PASSPHRASE",
  SIGNING_KEY = "SIGNING_KEY",
  TRANSFER_SERVER = "TRANSFER_SERVER",
  TRANSFER_SERVER_SEP0024 = "TRANSFER_SERVER_SEP0024",
  URI_REQUEST_SIGNING_KEY = "URI_REQUEST_SIGNING_KEY",
  VERSION = "VERSION",
  WEB_AUTH_ENDPOINT = "WEB_AUTH_ENDPOINT",
  CURRENCIES= "CURRENCIES"
}

export interface PresetAsset {
  assetCode: string;
  homeDomain?: string;
  issuerPublicKey?: string;
}

export interface Asset {
  assetString: string;
  assetCode: string;
  assetIssuer: string;
  assetType: string;
  total: string;
  homeDomain?: string;
  supportedActions?: AssetSupportedActions;
  isUntrusted?: boolean;
  isOverride?: boolean;
  isClaimableBalance?: boolean;
  notExist?: boolean;
  source: any;
  category?: AssetCategory;
}

export interface SearchParamAsset {
  assetString: string;
  homeDomain?: string;
}

export interface AssetSupportedActions {
  sep6?: boolean;
  sep8?: boolean;
  sep24?: boolean;
  sep31?: boolean;
}

export interface AccountInitialState {
  data: AccountDetails | null;
  assets: Asset[];
  errorString?: string;
  isAuthenticated: boolean;
  isUnfunded: boolean;
  secretKey: string;
  status: ActionStatus | undefined;
}

export interface ActiveAssetInitialState {
  action: ActiveAssetAction | undefined;
  status: ActionStatus | undefined;
}

export interface AllAssetsInitialState {
  data: Asset[];
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface AssetOverridesInitialState {
  data: Asset[];
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface ClaimAssetInitialState {
  data: {
    result: any;
    trustedAssetAdded?: string;
  };
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface ClaimableBalancesInitialState {
  data: {
    records: ClaimableAsset[] | null;
  };
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface Sep24DepositAssetInitialState {
  data: {
    currentStatus: string;
    trustedAssetAdded?: string;
  };
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface LogsInitialState {
  items: LogItemProps[];
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface SendPaymentInitialState {
  data: Horizon.HorizonApi.SubmitTransactionResponse | null;
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface SettingsInitialState {
  assetOverrides: string;
  secretKey: string;
  untrustedAssets: string;
  claimableBalanceSupported: boolean;
}

export interface UntrustedAssetsInitialState {
  data: Asset[];
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface AnyObject {
  [key: string]: any;
}

export interface AssetsObject {
  [key: string]: Asset;
}

export interface StringObject {
  [key: string]: string;
}

export interface NestedStringObject {
  [key: string]: {
    [key: string]: string;
  };
}

export interface CustomerTypeItem {
  type: string;
  description: string;
}

export interface Setting {
  [key: string]: any;
}

export interface TrustAssetInitialState {
  assetString: string;
  data: any;
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface Sep24WithdrawAssetInitialState {
  data: {
    currentStatus: string;
  };
  errorString?: string;
  status: ActionStatus | undefined;
}

export interface TrustAssetParam {
  assetString: string;
  assetCode: string;
  assetIssuer: string;
}

export enum LogType {
  REQUEST = "request",
  RESPONSE = "response",
  INSTRUCTION = "instruction",
  ERROR = "error",
  WARNING = "warning",
}

export interface LogItemProps {
  timestamp: number;
  type: LogType;
  title: string;
  body?: string | AnyObject;
  link?: string;
}

export interface Store {
  account: AccountInitialState;
  activeAsset: ActiveAssetInitialState;
  allAssets: AllAssetsInitialState;
  assetOverrides: AssetOverridesInitialState;
  claimAsset: ClaimAssetInitialState;
  claimableBalances: ClaimableBalancesInitialState;
  logs: LogsInitialState;
  sendPayment: SendPaymentInitialState;
  sep24DepositAsset: Sep24DepositAssetInitialState;
  sep24WithdrawAsset: Sep24WithdrawAssetInitialState;
  settings: SettingsInitialState;
  trustAsset: TrustAssetInitialState;
  untrustedAssets: UntrustedAssetsInitialState;
}

export type StoreKey = keyof Store;

export enum ActionStatus {
  ERROR = "ERROR",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  NEEDS_INPUT = "NEEDS_INPUT",
  CAN_PROCEED = "CAN_PROCEED",
}

export interface RejectMessage {
  errorString: string;
}

export interface PaymentTransactionParams {
  amount: string;
  assetCode?: string;
  assetIssuer?: string;
  destination: string;
  isDestinationFunded: boolean;
  publicKey: string;
}

export interface ClaimableAsset extends Asset {
  id: string;
  sponsor: string;
  lastModifiedLedger: number;
  claimants: any[];
}

export interface ActiveAssetAction {
  assetString: string;
  title: string;
  description?: string | React.ReactNode;
  callback: (args?: any) => void;
  options?: ReactNode;
}

export interface AssetActionItem extends ActiveAssetAction {
  balance: Asset;
}

export enum AssetActionId {
  SEND_PAYMENT = "send-payment",
  SEP6_DEPOSIT = "sep6-deposit",
  SEP6_WITHDRAW = "sep6-withdraw",
  SEP8_SEND_PAYMENT = "sep8-send-payment",
  SEP24_DEPOSIT = "sep24-deposit",
  SEP24_WITHDRAW = "sep24-withdraw",
  SEP31_SEND = "sep31-send",
  TRUST_ASSET = "trust-asset",
  REMOVE_ASSET = "remove-asset",
  ADD_ASSET_OVERRIDE = "add-asset-override",
  REMOVE_ASSET_OVERRIDE = "remove-asset-override",
}

export enum AssetType {
  NATIVE = "native",
}

export enum TransactionStatus {
  COMPLETED = "completed",
  ERROR = "error",
  INCOMPLETE = "incomplete",
  NON_INTERACTIVE_CUSTOMER_INFO_NEEDED = "non_interactive_customer_info_needed",
  PENDING_ANCHOR = "pending_anchor",
  PENDING_CUSTOMER_INFO_UPDATE = "pending_customer_info_update",
  PENDING_EXTERNAL = "pending_external",
  PENDING_RECEIVER = "pending_receiver",
  PENDING_SENDER = "pending_sender",
  PENDING_STELLAR = "pending_stellar",
  PENDING_TRANSACTION_INFO_UPDATE = "pending_transaction_info_update",
  PENDING_TRUST = "pending_trust",
  PENDING_USER = "pending_user",
  PENDING_USER_TRANSFER_START = "pending_user_transfer_start",
}

export enum MemoTypeString {
  TEXT = "text",
  ID = "id",
  HASH = "hash",
}

export enum AnchorActionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdraw",
}

interface InfoTypeData {
  // eslint-disable-next-line camelcase
  authentication_required: boolean;
  enabled: boolean;
  fields: AnyObject;
  types: AnyObject;
  // eslint-disable-next-line camelcase
  min_amount?: number;
  // eslint-disable-next-line camelcase
  max_amount?: number;
}

export interface CheckInfoData {
  [AnchorActionType.DEPOSIT]: {
    [asset: string]: InfoTypeData;
  };
  [AnchorActionType.WITHDRAWAL]: {
    [asset: string]: InfoTypeData;
  };
}

// Anchor quotes
export type AnchorDeliveryMethod = {
  name: string;
  description: string;
};

export type AnchorQuoteAsset = {
  asset: string;
  /* eslint-disable camelcase */
  sell_delivery_methods?: AnchorDeliveryMethod[];
  buy_delivery_methods?: AnchorDeliveryMethod[];
  country_codes?: string[];
  /* eslint-enable camelcase */
};

export type AnchorBuyAsset = {
  asset: string;
  price: string;
  decimals: number;
};

export type AnchorQuote = {
  id: string;
  price: string;
  fee: AnchorFee;
  /* eslint-disable camelcase */
  expires_at: string;
  total_price: string;
  sell_asset: string;
  sell_amount: string;
  buy_asset: string;
  buy_amount: string;
  /* eslint-enable camelcase */
};

export type AnchorFee = {
  total: string;
  asset: string;
  details?: AnchorFeeDetail[];
};

export type AnchorFeeDetail = {
  name: string;
  description?: string;
  amount: string;
};

export type SepInstructions = {
  [key: string]: {
    description: string;
    value: string;
  };
};

// js-stellar-wallets types
export interface Issuer {
  key: string;
  name?: string;
  url?: string;
  hostName?: string;
}

export interface NativeToken {
  type: AssetType;
  code: string;
}

export interface AssetToken {
  type: AssetType;
  code: string;
  issuer: Issuer;
  anchorAsset?: string;
  numAccounts?: BigNumber;
  amount?: BigNumber;
  bidCount?: BigNumber;
  askCount?: BigNumber;
  spread?: BigNumber;
}

export type Token = NativeToken | AssetToken;
export interface Balance {
  token: Token;

  // for non-native tokens, this should be total - sellingLiabilities
  // for native, it should also subtract the minimumBalance
  available: BigNumber;
  total: BigNumber;
  buyingLiabilities: BigNumber;
  sellingLiabilities: BigNumber;
}

export interface AssetBalance extends Balance {
  token: AssetToken;
  sponsor?: string;
}

export interface NativeBalance extends Balance {
  token: NativeToken;
  minimumBalance: BigNumber;
}

export interface BalanceMap {
  [key: string]: AssetBalance | NativeBalance;
  native: NativeBalance;
}

export interface AccountDetails {
  id: string;
  subentryCount: number;
  sponsoringCount: number;
  sponsoredCount: number;
  sponsor?: string;
  inflationDestination?: string;
  thresholds: Horizon.HorizonApi.AccountThresholds;
  signers: Horizon.ServerApi.AccountRecordSigners[];
  flags: Horizon.HorizonApi.Flags;
  balances: BalanceMap;
  sequenceNumber: string;
}