import ThaoLuanInput from './thao-luan-input';
import ThaoLuanList from './thao-luan-list';

export default function ThaoLuan({phieuYeuCauId}: {phieuYeuCauId: number}) {
  // const infoUser = useAppSelector(selectInfoUser);
  // const queryClient = useQueryClient();
  // const mutationCreate = useMutation(thaoLuanService.create, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('listThaoLuanHDDGParent');
  //   },
  // });
  // const handleSendMessage = (message: string) => {
  //   mutationCreate.mutate({noiDung: message, phieuYeuCauCuocHopId, parentId: 0});
  // };
  return (
    <div className="box-comment">
      <ThaoLuanInput data={{phieuYeuCauId: phieuYeuCauId, parentId: undefined}} />
      <ThaoLuanList phieuYeuCauId={phieuYeuCauId} />
    </div>
  );
}
