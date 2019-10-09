export interface ModalSettings {
    'title': String,
    'hasFooter': Boolean,
    'hasButtonCancel': Boolean,
    'hasButtonConfirm': Boolean,
    'component': Function,
    'size': 'mini' | 'small' | 'medium' | 'big' | 'full'
}